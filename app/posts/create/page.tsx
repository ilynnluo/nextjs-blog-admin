'use client'
import React, { ChangeEvent, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MainLayout from "@/app/layout/layout"

export default function CreatePost() {
  const [tab, setTab] = useState('basic')
  const handleTab = (e: React.MouseEvent<HTMLButtonElement>) => setTab(e.currentTarget.value)
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
  return (
    <MainLayout>
      <div>
        {/* page title */}
        <h2 className="text-2xl font-bold">Create</h2>
        {/* main content */}
        <div className="max-w-3xl">
          <div className='mt-8'>
            <button
              value='basic'
              onClick={handleTab}
              className='pb-2 border-b-4 border-white  focus:border-indigo-500'>
              Basic Info</button>
            <button
              value='main'
              onClick={handleTab}
              className='ml-8 pb-2 border-b-4 border-white  focus:border-indigo-500'>
              Main Content</button>
          </div>
          <div className="grid grid-cols-1">
            {/* basic Tab */}
            {
              tab === 'basic' && <div>
              {/* Create page title */}
              <div className="mt-8 px-4 py-2 border-l-4 border-indigo-500">
                General
              </div>
              {/* General */}
              <div>
                {/* input title */}
                <label className="block mt-8">
                  <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Title</span>
                  <input
                    type="text"
                    className="block mt-1 p-1 w-full border border-slate-300 
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
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
                      type="text"
                      className="form-input mt-1 p-1 w-48 block border border-slate-300
                          focus:border-blue-500 focus-visible:outline-none focus-visible:ring
                            placeholder:text-sm"
                      placeholder="How many"
                    />
                  </label>
                  <fieldset className="block ml-8">
                    <legend className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Unit</legend>
                    <div className="flex mt-2">
                      <div className="mr-8">
                        <label className="inline-flex items-center">
                          <input className="form-radio" type="radio" name="radio-direct" value="1" />
                          <span className="ml-2">Days</span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input className="form-radio" type="radio" name="radio-direct" value="2" />
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
                      <div className="mr-8">
                        <label className="inline-flex items-center">
                          <input className="form-checkbox" type="checkbox" />
                          <span className="ml-2">GTA</span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input className="form-checkbox" type="checkbox" />
                          <span className="ml-2">Halifax</span>
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              {/* Departure */}
              <div>
                <div className="mt-12 px-4 py-2 border-l-4 border-indigo-500">
                  Departure
                </div>
                <div className="flex mt-8">
                  <label className="block mr-8">
                    <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Province</span>
                    <select className="block w-48 mt-1 rounded-none  border-gray-300 shadow-sm text-sm text-slate-500
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option>Select a Province</option>
                      <option>Ontario</option>
                      <option>Nova Scotia</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">City</span>
                    <select className="block w-48 mt-1 rounded-none  border-gray-300 shadow-sm text-sm text-slate-500
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option>Toronto</option>
                      <option>Aurora</option>
                    </select>
                  </label>
                </div>
              </div>
              {/* Desitinations */}
              <div>
                <div className="mt-12 px-4 py-2 border-l-4 border-indigo-500">
                  Destinations
                </div>
                {/* select desitination information */}
                <div>
                  {/* province, city */}
                  <div className="flex mt-8">
                    <label className="block mr-8">
                      <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Province</span>
                      <select className="block w-48 mt-1 rounded-none  border-gray-300 shadow-sm text-sm text-slate-500
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      >
                        <option>Select a Province</option>
                        <option>Ontario</option>
                        <option>Nova Scotia</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">City</span>
                      <select className="block w-48 mt-1 rounded-none  border-gray-300 shadow-sm text-sm text-slate-500
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      >
                        <option>Toronto</option>
                        <option>Aurora</option>
                      </select>
                    </label>
                  </div>
                  {/* spot name */}
                  <label className="block mt-8">
                    <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Spot Name</span>
                    <input
                      type="text"
                      className="block mt-1 p-1 w-full border border-slate-300 
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                placeholder:text-sm"
                      placeholder="spot name"
                    />
                  </label>
                  {/* spot features */}
                  <div className="mt-8">
                    <fieldset className="block">
                      <legend className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                        Spot Features</legend>
                      <div className="flex mt-1">
                        <div className="mr-8">
                          <label className="inline-flex items-center">
                            <input className="form-checkbox" type="checkbox" />
                            <span className="ml-2">Cafe</span>
                          </label>
                        </div>
                        <div>
                          <label className="inline-flex items-center">
                            <input className="form-checkbox" type="checkbox" />
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
                            <input className="form-checkbox" type="checkbox" />
                            <span className="ml-2">Hiking</span>
                          </label>
                        </div>
                        <div>
                          <label className="inline-flex items-center">
                            <input className="form-checkbox" type="checkbox" />
                            <span className="ml-2">Swimming</span>
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                {/* add desitination button */}
                <div className="mt-8">
                  <button className="py-2 px-4 bg-emerald-500 text-white rounded">
                    Add Desitination
                  </button>
                </div>
              </div>
            </div>
            }
            {/* Main content Tab */}
            {
              tab === 'main' && <div>
              {/* Main content */}
              <div>
                <div className="mt-8 px-4 py-2 border-l-4 border-indigo-500">
                  Content
                </div>
                {/* editor */}
                <div className='mt-8 pb-8'>
                  <ReactQuill
                    className='mb-8 h-40'
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
            <div className="flex justify-end mt-12">
              <button className="py-2 px-4 bg-white text-indigo-500 rounded border border-indigo-500">
                Save
              </button>
              <button className="ml-8 py-2 px-4 bg-indigo-500 text-white rounded">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}