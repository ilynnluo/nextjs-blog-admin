'use client'
import React, { ChangeEvent, MouseEvent, useState, useRef, FormEvent, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MainLayout from "@/app/layout/layout"
import ProvinceCity from '@/app/components/provinceCity/ProvinceCity';
import CreateDestination from '@/app/components/createDestination/page';
import UpdateDestination from '@/app/components/updateDestination/page';
import { v4 as uuidv4 }from 'uuid'

var canada = require('canada')

enum TimeUnit {
  hours = 'hours',
  days = 'days'
}

export interface CityProp {
  province: string
  city: string
}

export interface DestinationProp {
  id: string
  spotName: string
  spotFeatures: string[]
  spotActivities: string[]
  spotProvince: string
  spotCity: string
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
  const newid = uuidv4()
  const [editorValue, setEditorValue] = useState('');
  const [title, setTitle] = useState('')
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const [length, setLength] = useState('')
  const handleLength = (e: ChangeEvent<HTMLInputElement>) => setLength(e.currentTarget.value)
  const [timeUnit, setTimeUnit] = useState('')
  const handleTimeUnit = (e: MouseEvent<HTMLInputElement>) => setTimeUnit(e.currentTarget.value)
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
  const [areaTags, setAreaTags] = useState(defaultTags)
  const checkedTags: string[] = []
  const handleAreaTag = (id: number, checked: boolean) => {
    const tags = [...areaTags]
    const clickedTag = tags.find((t) => t.id === id)
    if (clickedTag !== undefined) clickedTag.checked = checked
    const checkedTagsArray = tags.filter((t) => t.checked === true)
    checkedTagsArray.forEach((t) => { if (t.checked) checkedTags.push(t.name) })
    setAreaTags(tags)
  }
  const [departPro, setDepartPro] = useState('')
  const [cityList, setCityList] = useState<CityProp[]>([])
  const handleProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    setDepartPro(e.currentTarget.value)
    const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === e.currentTarget.value)
    setCityList(filterCityList)
  }
  const [departCity, setDepartCity] = useState('')
  const handleCity = (e: ChangeEvent<HTMLSelectElement>) => setDepartCity(e.currentTarget.value)

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
  const [createSpotName, setCreateSpotName] = useState('')
  const handleCreateSpotName = (e: ChangeEvent<HTMLInputElement>) => setCreateSpotName(e.currentTarget.value)
  const [createDestPro, setCreateDestPro] = useState('')
  let defaultCity: string
  const [createCityList, setCreateCityList] = useState<CityProp[]>([])
  const [createDestCity, setCreateDestCity] = useState('')
  const handleCreateDestProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    setCreateDestPro(e.currentTarget.value)
    const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === e.currentTarget.value)
    setCreateCityList(filterCityList)
    defaultCity = cities.find((c: CityProp) => c.province === e.currentTarget.value).city
    setCreateDestCity(defaultCity)
  }
  const handleCreateDestCity = (e: ChangeEvent<HTMLSelectElement>) => setCreateDestCity(e.currentTarget.value)
  const [createFeatures, setCreateFeatures] = useState(defaultFeatures)
  const [checkedCreateFeatures, setCheckedCreateFeatures] = useState<string[]>([])
  const handleCreateFeature = (name: string, checked: boolean) => {
    const copyFeatures = [...createFeatures]
    const clickedFeature = copyFeatures.find((t) => t.name === name)
    if (clickedFeature !== undefined) clickedFeature.checked = checked
    const checkedFeaturesArray = copyFeatures.filter((f) => f.checked === true)
    let checking: string[] = []
    checkedFeaturesArray.forEach((f) => {
      if (f.checked === true) checking.push(f.name)
    })
    setCheckedCreateFeatures(checking)
    setCreateFeatures(copyFeatures)
  }
  const [createActivities, setCreateActivities] = useState(defaultActivities)
  const [checkedCreateActivities, setCheckedCreateActivities] = useState<string[]>([])
  const handleCreateActivity = (name: string, checked: boolean) => {
    const copyActivities = [...createActivities]
    const clickedActivity = copyActivities.find((t) => t.name === name)
    if (clickedActivity !== undefined) clickedActivity.checked = checked
    const checkedActivitiesArray = copyActivities.filter((a) => a.checked === true)
    let checking: string[] = []
    checkedActivitiesArray.forEach((a) => {
      if (a.checked === true) checking.push(a.name)
    })
    setCheckedCreateActivities(checking)
    setCreateActivities(copyActivities)
  }
  const handleCreateDestination = () => {
    destinations.push({
      id: newid,
      spotName: createSpotName,
      spotFeatures: checkedCreateFeatures,
      spotActivities: checkedCreateActivities,
      spotProvince: createDestPro,
      spotCity: createDestCity
    })
    handleCloseDestination()
  }

  // update destination state management
  const [showUpdateDest, setShowUpdateDest] = useState(false)
  const handleShowUpdateDestination = (e: MouseEvent<HTMLButtonElement>, id: string, spotName: string) => {
    setShowUpdateDest(true)
    const selectedDest = destinations.find((d) => d.spotName === spotName)
    if(selectedDest !== undefined) {
      const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === selectedDest.spotProvince)
      setUpdateSpotId(selectedDest.id)
      console.log('selected id: ', selectedDest.id)
      setUpdateCityList(filterCityList)
      setUpdateSpotName(selectedDest.spotName)
      setUpdateDestPro(selectedDest.spotProvince)
      setUpdateDestCity(selectedDest.spotCity)
      console.log('selected city: ', selectedDest.spotCity)
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
    if(updatingDest !== undefined) {
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
                      className="block mt-1 p-1 w-full border border-slate-300 
                        focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                          placeholder:text-sm"
                      placeholder="place, features, group of target users will be good keywords"
                    />
                  </label>
                  {/* how long spend */}
                  <div className="flex mt-8">
                    <label className="block">
                      <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                        Length</span>
                      <input
                        type="number"
                        value={length}
                        onChange={handleLength}
                        className="form-input mt-1 p-1 w-48 block border border-slate-300
                          focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                            placeholder:text-sm"
                        placeholder="number only"
                      />
                    </label>
                    <fieldset className="block ml-8">
                      <legend className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                        Unit</legend>
                      <div className="flex mt-2">
                        <div className="mr-8">
                          <label className="inline-flex items-center">
                            <input
                              value={TimeUnit.days}
                              onClick={handleTimeUnit}
                              className="form-radio"
                              type="radio"
                              name="radio-direct" />
                            <span className="ml-2">Days</span>
                          </label>
                        </div>
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              value={TimeUnit.hours}
                              onClick={handleTimeUnit}
                              className="form-radio"
                              type="radio"
                              name="radio-direct" />
                            <span className="ml-2">Hours</span>
                          </label>
                        </div>
                      </div>
                    </fieldset>
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
                                onChange={e => handleAreaTag(t.id, e.target.checked)}
                                className="form-checkbox" />
                              <span className="ml-2">
                                {t.name}
                              </span>
                            </label>
                          </div>)
                        }
                      </div>
                    </fieldset>
                  </div>
                </div>
                {/* Departure */}
                <div>
                  <div className="mt-12 px-4 py-2 border-l-4 border-emerald-500">
                    Departure
                  </div>
                  <div className="flex mt-8 pl-4">
                    <ProvinceCity
                      provinceList={regions}
                      province={departPro}
                      cityList={cityList}
                      city={departCity}
                      handleProvince={handleProvince}
                      handleCity={handleCity}
                    />
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
                  </div>
                  {/* add destination */}
                  {
                    showCreateDest && <CreateDestination
                      handleCloseDestination={handleCloseDestination}
                      createSpotName={createSpotName}
                      handleCreateSpotName={handleCreateSpotName}
                      createDestPro={createDestPro}
                      handleCreateDestProvince={handleCreateDestProvince}
                      createDestCity={createDestCity}
                      handleCreateDestCity={handleCreateDestCity}
                      createCityList={createCityList}
                      createFeatures={createFeatures}
                      checkedCreateFeatures={checkedCreateFeatures}
                      handleCreateFeature={handleCreateFeature}
                      createActivities={createActivities}
                      checkedCreateActivities={checkedCreateActivities}
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
                <button className="py-2 px-4 bg-white text-emerald-500 rounded border border-emerald-500">
                  Save
                </button>
                <button className="ml-8 py-2 px-4 bg-emerald-500 text-white rounded">
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