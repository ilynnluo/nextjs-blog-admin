import { ChangeEvent } from "react"
import { CityProp } from "@/app/posts/create/page"

export default function ProvinceCity(
  props: {
    defaultProvince: string
    defaultCity: string
    provinceList: string[]
    // province: string
    cityList: CityProp[]
    // city: string
    handleProvince: (e: ChangeEvent<HTMLSelectElement>) => void
    handleCity: (e: ChangeEvent<HTMLSelectElement>) => void
  }) {
  const defaultProvince = props.defaultProvince
  const defaultCity = props.defaultCity
  // const province = props.province
  const provinceList = props.provinceList
  const cityList = props.cityList
  const handleProvince = props.handleProvince
  // const city = props.city
  const handleCity = props.handleCity

  return (
    <div className="flex">
      <label className="block mr-8">
        <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
          Province</span>
        <select
          defaultValue={defaultProvince}
          // value={province}
          onChange={handleProvince}
          required
          className="block w-48 mt-1 rounded-none  border-gray-300 shadow-sm text-sm text-slate-500
                  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value=''>Select a Province</option>
          {
            provinceList.map((p, index) => <option
              key={`${index}+${p}`}
              value={p}>
              {p}</option>)
          }
        </select>
      </label>
      <label className="block">
        <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
          City</span>
        <select
          defaultValue={defaultCity}
          onChange={handleCity}
          className="block w-48 mt-1 rounded-none  border-gray-300 shadow-sm text-sm text-slate-500
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          {
            cityList.map((item: { province: string, city: string }, index: number) =>
              <option
                key={`${index}+${item.province}+${item.city}`}
                value={item.city}>
                {item.city}
              </option>)
          }
        </select>
      </label>
    </div>
  )
}