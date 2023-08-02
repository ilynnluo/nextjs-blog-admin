'use client'
import React, { ChangeEvent, MouseEvent, useState, useRef, FormEvent, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MainLayout from "@/app/layout/layout"
import ProvinceCity from '@/app/components/provinceCity/ProvinceCity';
import CreateDestination from '@/app/components/createDestination/page';

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
  // create destination state management
  const [showCreateDest, setShowCreateDest] = useState(false)
  const handleShowDestination = () => setShowCreateDest(true)
  const handleCloseDestination = () => {
    setShowCreateDest(false)
    setCreateSpotName('')
    setCreateDestPro('')
    setCreateDestCity('')
    setCheckedCreateFeatures([])
    setCheckdCreateActivities([])
  }
  const [createSpotName, setCreateSpotName] = useState('')
  const handleCreateSpotName = (e: ChangeEvent<HTMLInputElement>) => setCreateSpotName(e.currentTarget.value)
  const [createDestPro, setCreateDestPro] = useState('')
  const handleCreateDestProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    setCreateDestPro(e.currentTarget.value)
    const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === e.currentTarget.value)
    setCreateCityList(filterCityList)
  }
  const [createCityList, setCreateCityList] = useState<CityProp[]>([])
  const [createDestCity, setCreateDestCity] = useState('')
  const handleCreateDestCity = (e: ChangeEvent<HTMLSelectElement>) => setCreateDestCity(e.currentTarget.value)
  const [createFeatures, setCreateFeatures] = useState(defaultFeatures)
  const [checkedCreateFeatures, setCheckedCreateFeatures] = useState<string[]>([])
  const handleCreateFeature = (name: string, checked: boolean) => {
    const copyFeatures = [...features]
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
  const [checkedCreateActivities, setCheckdCreateActivities] = useState<string[]>([])
  const handleCreateActivity = (name: string, checked: boolean) => {
    const copyActivities = [...activities]
    const clickedActivity = copyActivities.find((t) => t.name === name)
    if (clickedActivity !== undefined) clickedActivity.checked = checked
    const checkedActivitiesArray = copyActivities.filter((a) => a.checked === true)
    let checking: string[] = []
    checkedActivitiesArray.forEach((a) => {
      if (a.checked === true) checking.push(a.name)
    })
    setCheckdCreateActivities(checking)
    setCreateActivities(copyActivities)
  }
  const handleCreateDestination = () => {
    setShowCreateDest(false)
    destinations.push({
      spotName: createSpotName,
      spotFeatures: checkedCreateFeatures,
      spotActivities: checkedCreateActivities,
      spotProvince: createDestPro,
      spotCity: createDestCity
    })
  }
  

  const [spotName, setSpotName] = useState('')
  const [destPro, setDestPro] = useState('')
  const handleDestProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    setDestPro(e.currentTarget.value)
    const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === e.currentTarget.value)
    setCityList(filterCityList)
  }
  const handleDestCity = (e: ChangeEvent<HTMLSelectElement>) => setDestCity(e.currentTarget.value)
  const [destCity, setDestCity] = useState('')
  const handleSpotName = (e: ChangeEvent<HTMLInputElement>) => setSpotName(e.currentTarget.value)
  
  const [features, setFeatures] = useState(defaultFeatures)
  const [checkedFeatures, setCheckedFeatures] = useState<string[]>([])
  const handleSpotFeature = (name: string, checked: boolean) => {
    const spotFeatures = [...features]
    const clickedFeature = spotFeatures.find((t) => t.name === name)
    if (clickedFeature !== undefined) clickedFeature.checked = checked
    const checkedFeaturesArray = spotFeatures.filter((f) => f.checked === true)
    let checking: string[] = []
    checkedFeaturesArray.forEach((f) => {
      if (f.checked === true) checking.push(f.name)
    })
    setCheckedFeatures(checking)
    setFeatures(spotFeatures)
  }
  
  
  const [activities, setActivities] = useState(defaultActivities)
  const [checkedActivities, setCheckdActivities] = useState<string[]>([])
  const handleSpotActivity = (name: string, checked: boolean) => {
    const spotActivities = [...activities]
    const clickedActivity = spotActivities.find((t) => t.name === name)
    if (clickedActivity !== undefined) clickedActivity.checked = checked
    const checkedActivitiesArray = spotActivities.filter((a) => a.checked === true)
    let checking: string[] = []
    checkedActivitiesArray.forEach((a) => {
      if (a.checked === true) checking.push(a.name)
    })
    setCheckdActivities(checking)
    setActivities(spotActivities)
  }
  
  const [showEditDest, setShowEditDest] = useState(false)
  // default value should get from API, rather than [], update it later
  const [destinations, setDesitinations] = useState<DestinationProp[]>([])
  const handleAddDestination = () => {
    setShowCreateDest(false)
    destinations.push({
      spotName: spotName,
      spotFeatures: checkedFeatures,
      spotActivities: checkedActivities,
      spotProvince: destPro,
      spotCity: destCity
    })
  }
  const [selectedDest, setSelectedDest] = useState<DestinationProp | undefined>(undefined)
  const handleShowEditDestination = (e: MouseEvent<HTMLButtonElement>, name: string) => {
    setShowEditDest(true)
    const selecting = destinations.find((d) => d.spotName === name)
    setSelectedDest(selecting)
  }
  const handleUpdateDestination = (e: MouseEvent<HTMLButtonElement>, name: string | undefined) => {
    const copyDestinations = [...destinations]
    const updatingDestinations = copyDestinations.find((d) => d.spotName === name)
    if(updatingDestinations !== undefined) {
      updatingDestinations.spotName = spotName
      updatingDestinations.spotProvince = destPro
      updatingDestinations.spotCity = destCity
      updatingDestinations.spotActivities = checkedActivities
      updatingDestinations.spotFeatures = checkedFeatures
    }
    setDesitinations(copyDestinations)
    setShowEditDest(false)
  }
  const handleCloseEditDestination = () => setShowEditDest(false)

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
                          <button className='rounded border-indigo-500' onClick={e => handleShowEditDestination(e, d.spotName)}>
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
                    showEditDest && <div className="flex w-screen h-full z-50 fixed top-0 right-0 bg-slate-500/50">
                      <div className="m-auto items-center w-1/2 h-auto py-6 bg-white rounded overflow-auto">
                        {/* select desitination information */}
                        <div className='px-6'>
                          {/* add destination dialog header */}
                          <div className="flex justify-between items-center w-full">
                            <h2 className='text-xl bold'>Add spot</h2>
                            <div className="w-6 h-6 cursor-pointer" onClick={handleCloseEditDestination}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-slate-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          </div>
                          {/* spot information */}
                          <div className='mt-4'>
                            {/* spot name */}
                            <label className="block">
                              <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                                Spot Name</span>
                              <input
                                type="text"
                                defaultValue={selectedDest?.spotName}
                                onChange={handleSpotName}
                                className="block mt-1 p-1 w-full border border-slate-300 
                                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                  placeholder:text-sm"
                                placeholder="spot name"
                              />
                            </label>
                            {/* spot location */}
                            <div className="flex mt-8">
                              <ProvinceCity
                                provinceList={regions}
                                province={destPro}
                                cityList={cityList}
                                city={destCity}
                                handleProvince={handleDestProvince}
                                handleCity={handleDestCity}
                              />
                            </div>
                            {/* spot features */}
                            <div className="mt-8">
                              <fieldset className="block">
                                <legend className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                                  Spot Features</legend>
                                <div className="flex mt-1">
                                  <div className="mr-8">
                                    {
                                      features.map((f, index) => <label
                                        key={`${index}+${f.name}`}
                                        className="mr-8 inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          value={f.name}
                                          checked={f.checked}
                                          onChange={e => handleSpotFeature(f.name, e.target.checked)}
                                          className="form-checkbox" />
                                        <span className="ml-2">{f.name}</span>
                                      </label>)
                                    }
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                            {/* spot activities */}
                            <div className="mt-8">
                              <fieldset className="block">
                                <legend className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                                  Activities</legend>
                                <div className="flex mt-1">
                                  <div className="mr-8">
                                    {
                                      activities.map((a, index) => <label
                                        key={`${index}+${a.name}`}
                                        className="inline-flex items-center mr-8">
                                        <input
                                          type="checkbox"
                                          value='hiking'
                                          checked={a.checked}
                                          onChange={(e) => handleSpotActivity(a.name, e.target.checked)}
                                          className="form-checkbox" />
                                        <span className="ml-2">{a.name}</span>
                                      </label>)
                                    }
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                          </div>
                          {/* submit update button */}
                          <div className="flex justify-between mt-8">
                            <button className="py-2 px-4 bg-white text-red-500 rounded border border-red-500" onClick={handleShowDestination}>
                              Delete
                            </button>
                            <button className="py-2 px-4 bg-indigo-500 text-white rounded" onClick={e => handleUpdateDestination(e, selectedDest?.spotName)}>
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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