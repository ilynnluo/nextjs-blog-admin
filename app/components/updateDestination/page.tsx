import React, { ChangeEvent, MouseEvent } from "react"
import { CityProp, FeatureProp, ActivityProp } from "@/app/posts/create/page"
import ProvinceCity from "../provinceCity/ProvinceCity"

const canada = require('canada')

export default function UpdateDestination(
  props: {
    handleCloseUpdateDestination: () => void
    updateSpotId: string
    updateSpotName: string
    handleUpdateSpotName: (e: ChangeEvent<HTMLInputElement>) => void
    updateDestPro: string
    handleUpdateDestProvince: (e: ChangeEvent<HTMLSelectElement>) => void
    updateDestCity: string
    handleUpdateDestCity: (e: ChangeEvent<HTMLSelectElement>) => void
    updateCityList: CityProp[]
    updateFeatures: FeatureProp[]
    checkedUpdateFeatures: string[]
    handleUpdateFeature: (name: string, checked: boolean) => void
    updateActivities: ActivityProp[]
    checkedUpdateActivities: string[]
    handleUpdateActivity: (name: string, checked: boolean) => void
    handleUpdateDestination: (e: MouseEvent<HTMLButtonElement>, id: string) => void
    handleDeleteDestination: (id: string) => void
  }
) {
  const regionsData = canada.regions
  const regions = Object.keys(regionsData) as string[]
  const cities = canada.cities.map((cityData: string[]) => ({
    province: cityData[1],
    city: cityData[0]
  }))
  const handleCloseUpdateDestination = props.handleCloseUpdateDestination
  const updateSpotId = props.updateSpotId
  const updateSpotName = props.updateSpotName
  const handleUpdateSpotName = props.handleUpdateSpotName
  const updateDestPro = props.updateDestPro
  const handleUpdateDestProvince = props.handleUpdateDestProvince
  const updateDestCity = props.updateDestCity
  const handleUpdateDestCity = props.handleUpdateDestCity
  const updateCityList = props.updateCityList
  const updateFeatures = props.updateFeatures
  const checkedUpdateFeatures = props.checkedUpdateFeatures
  const handleUpdateFeature = props.handleUpdateFeature
  const updateActivities = props.updateActivities
  const checkedUpdateActivities = props.checkedUpdateActivities
  const handleUpdateActivity = props.handleUpdateActivity
  const handleUpdateDestination = props.handleUpdateDestination
  const handleDeleteDestination = props.handleDeleteDestination

  return <div className="flex w-screen h-full z-50 fixed top-0 right-0 bg-slate-500/50">
    <div className="m-auto items-center w-1/2 h-auto py-6 bg-white rounded overflow-auto">
      {/* select desitination information */}
      <div className='px-6'>
        {/* add destination dialog header */}
        <div className="flex justify-between items-center w-full">
          <h2 className='text-xl bold'>Add spot</h2>
          <div className="w-6 h-6 cursor-pointer" onClick={handleCloseUpdateDestination}>
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
              defaultValue={updateSpotName}
              onChange={handleUpdateSpotName}
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
              province={updateDestPro}
              cityList={updateCityList}
              city={updateDestCity}
              handleProvince={handleUpdateDestProvince}
              handleCity={handleUpdateDestCity}
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
                    updateFeatures.map((f, index) => <label
                      key={`${index}+${f.name}`}
                      className="mr-8 inline-flex items-center">
                      <input
                        type="checkbox"
                        value={f.name}
                        checked={f.checked}
                        onChange={e => handleUpdateFeature(f.name, e.target.checked)}
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
                    updateActivities.map((a, index) => <label
                      key={`${index}+${a.name}`}
                      className="inline-flex items-center mr-8">
                      <input
                        type="checkbox"
                        value='hiking'
                        checked={a.checked}
                        onChange={(e) => handleUpdateActivity(a.name, e.target.checked)}
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
          <button className="py-2 px-4 bg-white text-red-500 rounded border border-red-500" onClick={e => handleDeleteDestination(updateSpotId)}>
            Delete
          </button>
          <button className="py-2 px-4 bg-indigo-500 text-white rounded" onClick={e => handleUpdateDestination(e, updateSpotId)}>
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
}