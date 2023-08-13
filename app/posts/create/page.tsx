'use client'
import React, { ChangeEvent, MouseEvent, useState, useRef, FormEvent, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MainLayout from "@/app/layout/layout"
import ProvinceCity from '@/app/components/provinceCity/ProvinceCity';
import CreateDestination from '@/app/components/createDestination/page';
import UpdateDestination from '@/app/components/updateDestination/page';
import { v4 as uuidv4 } from 'uuid'

var canada = require('canada')

export interface CityProp {
  province: string
  city: string
}

export interface FeatureProp {
  id: number
  name: string
  checked: boolean
}

export interface ActivityProp {
  id: number
  name: string
  checked: boolean
}

enum FileType {
  saved = 'saved',
  published = 'published'
}

export interface DestinationProp {
  id: string
  spotName: string
  spotFeatures: string[]
  spotActivities: string[]
  spotProvince: string
  spotCity: string
}
interface PostProp {
  id: string
  fileType: FileType | null
  title: string
  length: string
  unit: string
  areaTags: string[]
  departProvince: string
  departCity: string
  destinations: DestinationProp[]
}

const defaultTags = [
  {
    id: 1,
    name: 'GTA',
    checked: false
  },
  {
    id: 2,
    name: 'Halifax',
    checked: false
  }
]

const defaultFeatures = [
  {
    id: 1,
    name: 'Cafe',
    checked: false
  },
  {
    id: 2,
    name: 'Park',
    checked: false
  }
]
const defaultActivities = [
  {
    id: 1,
    name: 'Hiking',
    checked: false
  },
  {
    id: 2,
    name: 'Swimming',
    checked: false
  }
]
const timeUnits = [
  {
    id: 1,
    name: 'Days',
    value: 'days'
  },
  {
    id: 2,
    name: 'Hours',
    value: 'hours'
  }
]

export default function CreatePost() {
  const regionsData = canada.regions
  const regions = Object.keys(regionsData) as string[]
  const cities = canada.cities.map((cityData: string[]) => ({
    province: cityData[1],
    city: cityData[0]
  }))
  const defaultTab = useRef<HTMLButtonElement>(null)
  const [tab, setTab] = useState('basic')
  const handleTab = (e: MouseEvent<HTMLButtonElement>) => setTab(e.currentTarget.value)
  const QuillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }
  const QuillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  const [editorValue, setEditorValue] = useState('');
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState<null | boolean>(null)
  const [titleValidation, setTitleValidation] = useState(false)
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setTitleValidation(e.target.validity.valid)
    e.target.validity.valid ? setTitleError(false) : setTitleError(true)
  }
  const [length, setLength] = useState('')
  const [timeLengthError, setTimeLengthError] = useState<boolean | null>(null)
  const [timeLengthValidation, setTimeLengthValidation] = useState(false)
  const handleLength = (e: ChangeEvent<HTMLInputElement>) => {
    setLength(e.currentTarget.value)
    setTimeLengthValidation(v => v = e.target.validity.valid)
    e.target.validity.valid ? setTimeLengthError(false) : setTimeLengthError(true)
  }
  const [timeUnit, setTimeUnit] = useState('')
  const [timeUnitError, setTimeUnitError] = useState<boolean | null>(null)
  const [timeUnitValidation, setTimeUnitValidation] = useState(false)
  const handleTimeUnit = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeUnit(e.currentTarget.value)
    setTimeUnitValidation(e.target.validity.valid)
    e.target.validity.valid ? setTimeUnitError(false) : setTimeUnitError(true)
  }
  const [areaTags, setAreaTags] = useState(defaultTags)
  const [checkedTags, setCheckedTags] = useState<string[]>([])
  const [areaTagError, setAreaTagError] = useState<boolean | null>(null)
  const [areaTagValidation, setAreaTagValidation] = useState(false)
  const handleAreaTag = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    // select checked tags
    const checked = e.target.checked
    const tags = [...areaTags]
    const clickedTag = tags.find((t) => t.id === id)
    if (clickedTag !== undefined) clickedTag.checked = checked
    const checkedTagsArray = tags.filter((t) => t.checked === true)
    checkedTagsArray.forEach((t) => { if (t.checked) checkedTags.push(t.name) })
    setAreaTags(tags)
    // validation
    const isCheced = checkedTagsArray.length > 0 ? true : false
    setAreaTagValidation(isCheced)
    isCheced ? setAreaTagError(false) : setAreaTagError(true)
  }
  const [departPro, setDepartPro] = useState('')
  const [departProvinceValidation, setDepartProvinceValidation] = useState(false)
  const [departProError, setDepartProError] = useState<boolean | null>(null)
  const [cityList, setCityList] = useState<CityProp[]>([])
  const [departCity, setDepartCity] = useState('')
  let defaultDepartCity
  const handleDepartProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    setDepartPro(e.currentTarget.value)
    const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === e.currentTarget.value)
    setCityList(filterCityList)
    defaultDepartCity = cities.find((c: CityProp) => c.province === e.currentTarget.value).city
    setDepartCity(defaultDepartCity)
    setDepartProvinceValidation(e.target.validity.valid)
    e.target.validity.valid ? setDepartProError(false) : setDepartProError(true)
  }
  const handleCity = (e: ChangeEvent<HTMLSelectElement>) => setDepartCity(e.currentTarget.value)

  const [destinations, setDesitinations] = useState<DestinationProp[]>([])
  // create destination state management
  const [showCreateDest, setShowCreateDest] = useState(false)
  const handleShowDestination = () => setShowCreateDest(true)
  const handleCloseDestination = () => {
    setShowCreateDest(false)
    setCreateSpotName('')
    setCreateDestPro('')
    setCreateCityList([])
    setCreateDestCity('')
    setCheckedCreateFeatures([])
    setCheckedCreateActivities([])
  }
  const [createSpotId, setCreateSpotId] = useState('')
  const [createSpotName, setCreateSpotName] = useState('')
  const [createSpotNameError, setCreateSpotNameError] = useState<boolean | null>(null)
  const [createSpotNameValidation, setCreateSpotNameValidation] = useState(false)
  const handleCreateSpotName = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateSpotName(e.currentTarget.value)
    setCreateSpotNameValidation(e.target.validity.valid)
    e.target.validity.valid ? setCreateSpotNameError(false) : setCreateSpotNameError(true)
  }
  const [createDestPro, setCreateDestPro] = useState('')
  const [createDestProError, setCreateDestProError] = useState<boolean | null>(null)
  let defaultCity: string
  const [createCityList, setCreateCityList] = useState<CityProp[]>([])
  const [createDestCity, setCreateDestCity] = useState('')
  const [createDestProValidation, setCreateDestProValidation] = useState(false)
  const handleCreateDestProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    setCreateDestPro(e.currentTarget.value)
    const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === e.currentTarget.value)
    setCreateCityList(filterCityList)
    defaultCity = cities.find((c: CityProp) => c.province === e.currentTarget.value).city
    setCreateDestCity(defaultCity)
    setCreateDestProValidation(e.target.validity.valid)
    e.target.validity.valid ? setCreateDestProError(false) : setCreateDestProError(true)
  }
  const handleCreateDestCity = (e: ChangeEvent<HTMLSelectElement>) => setCreateDestCity(e.currentTarget.value)
  const [createFeatures, setCreateFeatures] = useState(defaultFeatures)
  const [checkedCreateFeatures, setCheckedCreateFeatures] = useState<string[]>([])
  const [createFeaturesError, setCreateFeaturesError] = useState<boolean | null>(null)
  const [createFeatureValidation, setCreateFeatureValidation] = useState(false)
  const handleCreateFeature = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    const copyFeatures = [...createFeatures]
    const clickedFeature = copyFeatures.find((t) => t.name === name)
    const checked = e.target.checked
    if (clickedFeature !== undefined) clickedFeature.checked = checked
    const checkedFeaturesArray = copyFeatures.filter((f) => f.checked === true)
    let checking: string[] = []
    checkedFeaturesArray.forEach((f) => {
      if (f.checked === true) checking.push(f.name)
    })
    const isChecked = checking.length > 0 ? true : false
    setCheckedCreateFeatures(checking)
    setCreateFeatures(copyFeatures)
    setCreateFeatureValidation(isChecked)
    isChecked ? setCreateFeaturesError(false) : setCreateFeaturesError(true)
  }
  const [createActivities, setCreateActivities] = useState(defaultActivities)
  const [checkedCreateActivities, setCheckedCreateActivities] = useState<string[]>([])
  const [createActivitiesError, setCreateActivitiesError] = useState<boolean | null>(null)
  const [createActivityValidation, setCreateActivityValidation] = useState(false)
  const handleCreateActivity = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    const copyActivities = [...createActivities]
    const clickedActivity = copyActivities.find((t) => t.name === name)
    const checked = e.target.checked
    if (clickedActivity !== undefined) clickedActivity.checked = checked
    const checkedActivitiesArray = copyActivities.filter((a) => a.checked === true)
    let checking: string[] = []
    checkedActivitiesArray.forEach((a) => {
      if (a.checked === true) checking.push(a.name)
    })
    const isChecked = checking.length > 0 ? true : false
    setCheckedCreateActivities(checking)
    setCreateActivities(copyActivities)
    setCreateActivityValidation(isChecked)
    isChecked ? setCreateActivitiesError(false) : setCreateActivitiesError(true)
  }
  const [destinationValidation, setDestinationValidation] = useState(false)
  const [destinationError, setDestinationError] = useState<boolean | null>(null)
  const handleCreateDestination = () => {
    const newSpotId = uuidv4()
    setCreateSpotId(newSpotId)
    const destStatesValidations = [createSpotNameValidation, createDestProValidation, createFeatureValidation, createActivityValidation]
    createSpotNameValidation || setCreateSpotNameError(true)
    createDestProValidation || setCreateDestProError(true)
    createFeatureValidation || setCreateFeaturesError(true)
    createActivityValidation || setCreateActivitiesError(true)
    if (destStatesValidations.every(d => d === true)) {
      destinations.push({
        id: createSpotId,
        spotName: createSpotName,
        spotFeatures: checkedCreateFeatures,
        spotActivities: checkedCreateActivities,
        spotProvince: createDestPro,
        spotCity: createDestCity
      })
      handleCloseDestination()
    }
    let isChecked = destinations.length > 0 ? true : false
    setDestinationValidation(isChecked)
    isChecked && setDestinationError(false)
  }

  // update destination state management
  const [showUpdateDest, setShowUpdateDest] = useState(false)
  const handleShowUpdateDestination = (e: MouseEvent<HTMLButtonElement>, id: string, spotName: string) => {
    setShowUpdateDest(true)
    const selectedDest = destinations.find((d) => d.spotName === spotName)
    if (selectedDest !== undefined) {
      const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === selectedDest.spotProvince)
      setUpdateSpotId(selectedDest.id)
      setUpdateCityList(filterCityList)
      setUpdateSpotName(selectedDest.spotName)
      setUpdateDestPro(selectedDest.spotProvince)
      setUpdateDestCity(selectedDest.spotCity)
      setCheckedUpdateFeatures(selectedDest.spotFeatures)
      setCheckedUpdateActivities(selectedDest.spotActivities)
    }
  }
  const handleCloseUpdateDestination = () => {
    setShowUpdateDest(false)
    setUpdateSpotName('')
    setUpdateDestPro('')
    setUpdateCityList([])
    setUpdateDestCity('')
    setCheckedUpdateFeatures([])
    setCheckedUpdateActivities([])
  }
  const [updateSpotId, setUpdateSpotId] = useState('')
  const [updateSpotName, setUpdateSpotName] = useState('')
  const handleUpdateSpotName = (e: ChangeEvent<HTMLInputElement>) => setUpdateSpotName(e.currentTarget.value)
  const [updateDestPro, setUpdateDestPro] = useState('')
  const handleUpdateDestProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdateDestPro(e.currentTarget.value)
    const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === e.currentTarget.value)
    setUpdateCityList(filterCityList)
  }
  const [updateCityList, setUpdateCityList] = useState<CityProp[]>([])
  const [updateDestCity, setUpdateDestCity] = useState('')
  const handleUpdateDestCity = (e: ChangeEvent<HTMLSelectElement>) => setUpdateDestCity(e.currentTarget.value)
  const [updateFeatures, setUpdateFeatures] = useState(defaultFeatures)
  const [checkedUpdateFeatures, setCheckedUpdateFeatures] = useState<string[]>([])
  const handleUpdateFeature = (name: string, checked: boolean) => {
    const copyFeatures = [...updateFeatures]
    const clickedFeature = copyFeatures.find((t) => t.name === name)
    if (clickedFeature !== undefined) clickedFeature.checked = checked
    const checkedFeaturesArray = copyFeatures.filter((f) => f.checked === true)
    let checking: string[] = []
    checkedFeaturesArray.forEach((f) => {
      if (f.checked === true) checking.push(f.name)
    })
    setCheckedUpdateFeatures(checking)
    setUpdateFeatures(copyFeatures)
  }
  const [updateActivities, setUpdateActivities] = useState(defaultActivities)
  const [checkedUpdateActivities, setCheckedUpdateActivities] = useState<string[]>([])
  const handleUpdateActivity = (name: string, checked: boolean) => {
    const copyActivities = [...updateActivities]
    const clickedActivity = copyActivities.find((t) => t.name === name)
    if (clickedActivity !== undefined) clickedActivity.checked = checked
    const checkedActivitiesArray = copyActivities.filter((a) => a.checked === true)
    let checking: string[] = []
    checkedActivitiesArray.forEach((a) => {
      if (a.checked === true) checking.push(a.name)
    })
    setCheckedUpdateActivities(checking)
    setUpdateActivities(copyActivities)
  }
  const handleUpdateDestination = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    const copyDestinations = [...destinations]
    const updatingDest = copyDestinations.find((d) => d.id === id)
    if (updatingDest !== undefined) {
      updatingDest.spotName = updateSpotName
      updatingDest.spotProvince = updateDestPro
      updatingDest.spotCity = updateDestCity
      updatingDest.spotFeatures = checkedUpdateFeatures
      updatingDest.spotActivities = checkedUpdateActivities
    }
    setDesitinations(copyDestinations)
    handleCloseUpdateDestination()
  }
  const handleDeleteDestination = (id: string) => {
    const copyDestinations = [...destinations]
    const updatedDestinations = copyDestinations.filter((d) => d.id !== id)
    setDesitinations(updatedDestinations)
    handleCloseUpdateDestination()
  }

  // submit
  const [fileType, setFileType] = useState<FileType | null>(null)
  const [loading, setLoading] = useState(false)
  const validationPost = () => {
    titleValidation || setTitleError(true)
    timeLengthValidation || setTimeLengthError(true)
    timeUnitValidation || setTimeUnitError(true)
    areaTagValidation || setAreaTagError(true)
    departProvinceValidation || setDepartProError(true)
    destinationValidation || setDestinationError(true)
  }
  const [post, setPost] = useState<PostProp | null>(null)
  const newPostId = uuidv4()
  const updatingPost = {
    id: '',
    fileType: fileType,
    title: title,
    length: length,
    unit: timeUnit,
    areaTags: checkedTags,
    departProvince: departPro,
    departCity: departCity,
    destinations: destinations
  }
  const handleSave = () => {
    setLoading(true)
    setFileType(FileType.saved)
    setPost(updatingPost)
    console.log('save --- : ', post)
  }
  const handlePublish = () => {
    setLoading(true)
    setFileType(FileType.published)
    validationPost()
    setPost(updatingPost)
    console.log('publishing: ', post)
  }

  return (
    <MainLayout>
      <div>
        {/* page title */}
        <h2 className="text-2xl font-bold">Create</h2>
        {/* main content */}
        <div className="max-w-3xl">
          <div className='mt-8 pt-2 sticky top-0 bg-white'>
            <button
              ref={defaultTab}
              value='basic'
              onClick={handleTab}
              className='pb-2 border-b-4 border-white  focus:border-emerald-500 focus-visible:border-white'>
              Basic Info</button>
            <button
              value='main'
              onClick={handleTab}
              className='ml-8 pb-2 border-b-4 border-white  focus:border-emerald-500'>
              Main Content</button>
          </div>
          <div className="grid grid-cols-1">
            {/* basic Tab */}
            {
              tab === 'basic' && <div>
                {/* Create page title */}
                <div className="mt-8 px-4 py-2 border-l-4 border-emerald-500">
                  General
                </div>
                {/* General */}
                <div className='pl-4'>
                  {/* input title */}
                  <label className="block mt-8">
                    <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Title</span>
                    <input
                      type="text"
                      value={title}
                      onChange={handleTitle}
                      required
                      minLength={3}
                      maxLength={10}
                      className="block mt-1 p-1 w-full border border-slate-300 
                        focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                          placeholder:text-sm placeholder:text-slate-300
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-100"
                      placeholder="place, features, group of target users will be good keywords"
                    />
                    {
                      titleError === null
                        ? <span className='text-xs text-slate-500'>Please input at lease 3 and no more than 50 charactors</span>
                        : titleError
                          ? <span className='text-xs text-pink-500'>Please input at lease 3 and no more than 50 charactors</span>
                          : <div className="block h-6" />
                    }
                  </label>
                  {/* how long spend */}
                  <div className="mt-8">
                    <div className="flex">
                      <label className="block">
                        <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                          Length</span>
                        <input
                          type="number"
                          value={length}
                          onChange={handleLength}
                          required
                          max={1000}
                          className="form-input mt-1 p-1 w-48 block border border-slate-300
                          focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                          focus:invalid:border-pink-500 focus:invalid:ring-pink-100
                            placeholder:text-sm placeholder:text-slate-300"
                          placeholder="number only"
                        />
                      </label>
                      <fieldset className="block ml-8">
                        <legend className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                          Unit</legend>
                        <div className="flex mt-2">
                          <div className="mr-8">
                            {
                              timeUnits.map((t) => <label key={`${t.id}+${t.value}`} className="inline-flex items-center">
                                <input
                                  type="radio"
                                  value={t.value}
                                  onChange={handleTimeUnit}
                                  required
                                  className="form-radio"
                                  name="radio-direct" />
                                <span className="ml-2 mr-8">{t.name}</span>
                              </label>)
                            }
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    {
                      (timeLengthError === null && timeUnitError === null)
                        ? <span className='text-xs text-slate-500'>Please input a number, less than 1000, and select a unit</span>
                        : (timeLengthError === false && timeUnitError === false)
                          ? <div className="block h-6" />
                          : <span className='text-xs text-pink-500'>Please input a number, less than 1000, and select a unit</span>
                    }
                  </div>
                  {/* general area tags */}
                  <div className="mt-8">
                    <fieldset className="block">
                      <legend className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                        Area Tags</legend>
                      <div className="flex mt-1">
                        {
                          areaTags.map((t) => <div key={t.name} className="mr-8">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                value='gta'
                                checked={t.checked}
                                onChange={e => handleAreaTag(e, t.id)}
                                required
                                className="form-checkbox" />
                              <span className="ml-2">
                                {t.name}
                              </span>
                            </label>
                          </div>)
                        }
                      </div>
                      {
                        areaTagError === null
                          ? <div className="block h-6" />
                          : areaTagError
                            ? <span className='text-xs text-pink-500'>Please select at least 1 tag</span>
                            : <div className="block h-6" />
                      }
                    </fieldset>
                  </div>
                </div>
                {/* Departure */}
                <div>
                  <div className="mt-12 px-4 py-2 border-l-4 border-emerald-500">
                    Departure
                  </div>
                  <div className="mt-8 pl-4">
                    <ProvinceCity
                      provinceList={regions}
                      province={departPro}
                      cityList={cityList}
                      city={departCity}
                      handleProvince={handleDepartProvince}
                      handleCity={handleCity}
                    />
                    {
                      departProError === null
                        ? <span className='text-xs text-slate-500'>Please select a Province</span>
                        : departProError
                          ? <span className='text-xs text-pink-500'>Please select a Province</span>
                          : <div className="block h-6" />
                    }
                  </div>
                </div>
                {/* Desitinations */}
                <div>
                  <div className="mt-12 px-4 py-2 border-l-4 border-emerald-500">
                    Destinations
                  </div>
                  <div className='p-4'>
                    {
                      destinations.map((d: DestinationProp, index: number) => <div
                        key={`${index}+${d.spotName}`}
                        className='flex justify-between mt-2 hover:text-indigo-500'>
                        <div className='w-96 overflow-hidden'>
                          <span>{d.spotName}</span>
                        </div>
                        <div>
                          <button className='rounded border-indigo-500' onClick={e => handleShowUpdateDestination(e, d.id, d.spotName)}>
                            <span className='text-indigo-500 text-xs'>more</span>
                          </button>
                        </div>
                      </div>)
                    }
                  </div>
                  {/* add desitination button */}
                  <div className="mt-4">
                    <button className="py-2 px-4 bg-indigo-500 text-white rounded" onClick={handleShowDestination}>
                      Add Desitination
                    </button>
                    <div>
                      {
                        destinationError === null
                          ? <span className='text-xs text-slate-500'>Please add at lease one destination</span>
                          : destinationError
                            ? <span className='text-xs text-pink-500'>Please add at lease one destination</span>
                            : <div className="block h-6" />
                      }
                    </div>
                  </div>
                  {/* add destination */}
                  {
                    showCreateDest && <CreateDestination
                      handleCloseDestination={handleCloseDestination}
                      createSpotId={createSpotId}
                      createSpotName={createSpotName}
                      createSpotNameError={createSpotNameError}
                      handleCreateSpotName={handleCreateSpotName}
                      createDestPro={createDestPro}
                      createDestProError={createDestProError}
                      handleCreateDestProvince={handleCreateDestProvince}
                      createDestCity={createDestCity}
                      handleCreateDestCity={handleCreateDestCity}
                      createCityList={createCityList}
                      createFeatures={createFeatures}
                      createFeaturesError={createFeaturesError}
                      handleCreateFeature={handleCreateFeature}
                      createActivities={createActivities}
                      createActivitiesError={createActivitiesError}
                      handleCreateActivity={handleCreateActivity}
                      handleCreateDestination={handleCreateDestination}
                    />
                  }
                  {/* edit destination */}
                  {
                    showUpdateDest && <UpdateDestination
                      handleCloseUpdateDestination={handleCloseUpdateDestination}
                      updateSpotId={updateSpotId}
                      updateSpotName={updateSpotName}
                      handleUpdateSpotName={handleUpdateSpotName}
                      updateDestPro={updateDestPro}
                      handleUpdateDestProvince={handleUpdateDestProvince}
                      updateDestCity={updateDestCity}
                      handleUpdateDestCity={handleUpdateDestCity}
                      updateCityList={updateCityList}
                      updateFeatures={updateFeatures}
                      checkedUpdateFeatures={checkedUpdateFeatures}
                      handleUpdateFeature={handleUpdateFeature}
                      updateActivities={updateActivities}
                      checkedUpdateActivities={checkedUpdateActivities}
                      handleUpdateActivity={handleUpdateActivity}
                      handleUpdateDestination={handleUpdateDestination}
                      handleDeleteDestination={handleDeleteDestination}
                    />
                  }
                </div>
              </div>
            }
            {/* Main content Tab */}
            {
              tab === 'main' && <div>
                {/* Main content */}
                <div>
                  <div className="mt-8 px-4 py-2 border-l-4 border-emerald-500">
                    Content
                  </div>
                  {/* editor */}
                  <div className='mt-8 pb-8'>
                    <ReactQuill
                      className='mb-8 h-64'
                      theme='snow'
                      value={editorValue}
                      onChange={setEditorValue}
                      modules={QuillModules}
                      formats={QuillFormats}
                    />
                  </div>
                </div>
              </div>
            }
            {/* submit Button */}
            <div className="flex justify-between mt-12">
              <button className="py-2 px-4 bg-white text-red-500 rounded border border-red-500">
                Delete
              </button>
              <div>
                <button
                  className="py-2 px-4 bg-white text-emerald-500 rounded border border-emerald-500"
                  onClick={handleSave}>
                  Save
                </button>
                <button
                  className="ml-8 py-2 px-4 bg-emerald-500 text-white rounded"
                  onClick={handlePublish}
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}