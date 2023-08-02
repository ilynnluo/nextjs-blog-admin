import React, { useState, ChangeEvent } from "react"
import ProvinceCity from "../provinceCity/ProvinceCity"
import { DestinationProp, CityProp, ActivityProp, FeatureProp } from "@/app/posts/create/page"

var canada = require('canada')

export default function CreateDestination(
  props: {
    handleCloseDestination: () => void
    createSpotName: string
    handleCreateSpotName: (e: ChangeEvent<HTMLInputElement>) => void
    createDestPro: string
    handleCreateDestProvince: (e: ChangeEvent<HTMLSelectElement>) => void
    createDestCity: string
    handleCreateDestCity: (e: ChangeEvent<HTMLSelectElement>) => void
    createCityList: CityProp[]
    createFeatures: FeatureProp[]
    checkedCreateFeatures: string[]
    handleCreateFeature: (name: string, checked: boolean) => void
    createActivities: ActivityProp[]
    checkedCreateActivities: string[]
    handleCreateActivity: (name: string, checked: boolean) => void
    handleCreateDestination: () => void
  }
) {
  const regionsData = canada.regions
  const regions = Object.keys(regionsData) as string[]
  const cities = canada.cities.map((cityData: string[]) => ({
    province: cityData[1],
    city: cityData[0]
  }))
  const [cityList, setCityList] = useState<CityProp[]>([])
  const handleCloseDestination = props.handleCloseDestination
  const createSpotName = props.createSpotName
  const handleSpotName = props.handleCreateSpotName
  const createDestPro = props.createDestPro
  const handleCreateDestProvince = props.handleCreateDestProvince
  const createCityList = props.createCityList
  const createDestCity = props.createDestCity
  const handleCreateDestCity = props.handleCreateDestCity
  const checkedCreateFeatures = props.checkedCreateFeatures
  const handleCreateFeature = props.handleCreateFeature
  const checkedCreateActivities = props.checkedCreateActivities
  const handleCreateActivity = props.handleCreateActivity
  const handleCreateDestination = props.handleCreateDestination

  const [destPro, setDestPro] = useState('')
  const [destCity, setDestCity] = useState('')
  const handleDestProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    setDestPro(e.currentTarget.value)
    const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === e.currentTarget.value)
    setCityList(filterCityList)
  }
  const handleDestCity = (e: ChangeEvent<HTMLSelectElement>) => setDestCity(e.currentTarget.value)
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
  const [destinations, setDesitinations] = useState<DestinationProp[]>([])
  const handleAddDestination = () => {
    handleCloseDestination()
    destinations.push({
      spotName: createSpotName,
      spotFeatures: checkedCreateFeatures,
      spotActivities: checkedCreateActivities,
      spotProvince: destPro,
      spotCity: destCity
    })
  }

  return <div className="flex w-screen h-full z-50 fixed top-0 right-0 bg-slate-500/50">
  <div className="m-auto items-center w-1/2 h-auto py-6 bg-white rounded overflow-auto">
    {/* select desitination information */}
    <div className='px-6'>
      {/* add destination dialog header */}
      <div className="flex justify-between items-center w-full">
        <h2 className='text-xl bold'>Add spot</h2>
        <div className="w-6 h-6 cursor-pointer" onClick={handleCloseDestination}>
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
            value={createSpotName}
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
            province={createDestPro}
            cityList={createCityList}
            city={createDestCity}
            handleProvince={handleCreateDestProvince}
            handleCity={handleCreateDestCity}
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
                      onChange={e => handleCreateFeature(f.name, e.target.checked)}
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
                      onChange={(e) => handleCreateActivity(a.name, e.target.checked)}
                      className="form-checkbox" />
                    <span className="ml-2">{a.name}</span>
                  </label>)
                }
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      {/* submit add button */}
      <div className="flex justify-between mt-8">
        <button className="py-2 px-4 bg-white text-red-500 rounded border border-red-500" onClick={handleCloseDestination}>
          Cancel
        </button>
        <button className="py-2 px-4 bg-indigo-500 text-white rounded" onClick={handleCreateDestination}>
          Add Spot
        </button>
      </div>
    </div>
  </div>
</div>
}