'use client'
import React, { ChangeEvent, MouseEvent, useState, useRef, FormEvent, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MainLayout from "@/app/layout/layout"
import ProvinceCity from '@/app/components/provinceCity/ProvinceCity';

var canada = require('canada')

enum TimeUnit {
  hours = 'hours',
  days = 'days'
}

export interface CityProp {
  province: string
  city: string
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
      tagName: 'GTA',
      checked: false
    },
    {
      id: 2,
      tagName: 'Halifax',
      checked: false
    }
  ]
  const [areaTags, setAreaTags] = useState(defaultTags)
  const handleAreaTag = (id: number, checked: boolean) => {
    const tags = [...areaTags]
    const clickedTag = tags.find((t) => t.id === id)
    if (clickedTag !== undefined) clickedTag.checked = checked
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
  // const [destination, setDestination] = useState({
  //   id: '',
  //   destiPro: '',
  //   destiCity: '',
  //   spot: {
  //     id: '',
  //     spotName: '',
  //     spotFeature: [],
  //     spotActivities: []
  //   }
  // })
  const [spotName, setSpotName] = useState('')
  const [destPro, setDestPro] = useState('')
  const handleDestProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    setDestPro(e.currentTarget.value)
    const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === e.currentTarget.value)
    setCityList(filterCityList)
  }
  const handleDestCity = (e: ChangeEvent<HTMLSelectElement>) => setDestCity(e.currentTarget.value)
  const [destCity, setDestCity] = useState('')
  const handleSpotName = () => { }
  const handleSpotFeature = () => { }
  const handleSpotActivity = () => { }

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
                          areaTags.map((t) => <div key={t.tagName} className="mr-8">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                value='gta'
                                checked={t.checked}
                                onChange={e => handleAreaTag(t.id, e.target.checked)}
                                className="form-checkbox" />
                              <span className="ml-2">
                                {t.tagName}
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
                  {/* add desitination button */}
                  <div className="mt-8">
                    <button className="py-2 px-4 bg-indigo-500 text-white rounded">
                      Add Desitination
                    </button>
                  </div>
                  <div className="flex w-screen h-full z-50 fixed top-0 right-0 bg-slate-500/50">
                    <div className="m-auto items-center w-1/2 h-auto bg-white rounded overflow-auto">
                      {/* select desitination information */}
                      <div className='px-6 py-4'>
                        <h2 className='py-4 text-xl bold'>Add spot</h2>
                        {/* spot information */}
                        <div className='mt-4'>
                          {/* spot name */}
                          <label className="block">
                            <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                              Spot Name</span>
                            <input
                              type="text"
                              value={spotName}
                              onChange={handleSpotName}
                              className="block mt-1 p-1 w-full border border-slate-300 
                                focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50
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
                                  <label className="inline-flex items-center">
                                    <input
                                      type="checkbox"
                                      value='cafe'
                                      onClick={handleSpotFeature}
                                      className="form-checkbox" />
                                    <span className="ml-2">Cafe</span>
                                  </label>
                                </div>
                                <div>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="checkbox"
                                      value='park'
                                      onClick={handleSpotFeature}
                                      className="form-checkbox" />
                                    <span className="ml-2">Park</span>
                                  </label>
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
                                  <label className="inline-flex items-center">
                                    <input
                                      type="checkbox"
                                      value='hiking'
                                      onClick={handleSpotActivity}
                                      className="form-checkbox" />
                                    <span className="ml-2">Hiking</span>
                                  </label>
                                </div>
                                <div>
                                  <label className="inline-flex items-center">
                                    <input
                                      type="checkbox"
                                      value='swimming'
                                      onClick={handleSpotActivity}
                                      className="form-checkbox" />
                                    <span className="ml-2">Swimming</span>
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                        {/* add button */}
                        <div className="flex justify-between mt-8">
                          <button className="py-2 px-4 bg-white text-red-500 rounded border border-red-500">
                            Cancel
                          </button>
                          <button className="py-2 px-4 bg-indigo-500 text-white rounded">
                            Add Spot
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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