'use client'
import React, { ChangeEvent, MouseEvent, useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MainLayout from "@/app/layout/layout"
import ProvinceCity from '@/app/components/provinceCity/ProvinceCity';
import CreateDestination from '@/app/components/createDestination/page';
import UpdateDestination from '@/app/components/updateDestination/page';
import { CityProp, FileType, DestinationProp, PostProp } from '../create/page';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import {
  getPost, updatePost, deletePost, selectPost, selectGetPostLoading, selectGetPostError, selectPostTitle, selectPostLength, selectPostTimeUnit, selectPostTags, selectPostAreaTags,
  selectPostDepartProvince, selectPostDestinations, selectPostFileType
} from '../../redux/postSlice'
import { Provider } from 'react-redux';
import { store } from '../../redux/store'

var canada = require('canada')

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
const defaultTimeUnits = [
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
const postStates = [
  {
    id: 1,
    name: 'Offline',
    value: 'offline'
  },
  {
    id: 2,
    name: 'Publish',
    value: 'published'
  }
]
const DelConfirmDialog = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const postId = params.id as string
  const router = useRouter()
  const [showDelConfirm, setShowDelConfirm] = useState(false)
  const handleDelete = () => setShowDelConfirm(true)
  const handleConfirmDel = () => {
    dispatch(deletePost({ postId }))
    setShowDelConfirm(false)
    // why this line doesn't work? redirect('http://localhost:3001/posts')
    router.push('http://localhost:3001/posts')
  }
  const handleCancelDel = () => setShowDelConfirm(false)
  return (
    <div>
      <button
        className="py-2 px-4 bg-white text-red-500 rounded border border-red-500"
        onClick={handleDelete}>
        Delete
      </button>
      {
        showDelConfirm && <div className='flex justify-center items-center w-screen h-full bg-slate-400/50 z-10 fixed top-0 left-0'>
          <div className="p-8 rounded bg-white w-80 h-40">
            <span>
              Comfirm to delete?
            </span>
            <div className="flex mt-8 justify-between">
              <button className="rounded py-2 px-4 h-10 bg-red-600" onClick={handleConfirmDel}>
                <span className="text-white">
                  Delete
                </span>
              </button>
              <button className="rounded py-2 px-4 h-10 border border-slate-500 bg-white" onClick={handleCancelDel}>
                <span className="text-slate-700">
                  Cancel
                </span>
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
function EditPost() {
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
  const dispatch = useAppDispatch()
  const params = useParams()
  const postId = params.id as string
  const post = useAppSelector(selectPost)
  const postLoading = useAppSelector(selectGetPostLoading)
  const postError = useAppSelector(selectGetPostError)
  // title
  const postTitle = useAppSelector(selectPostTitle)
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState<null | boolean>(false)
  const [titleValidation, setTitleValidation] = useState(true)
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setTitleValidation(e.target.validity.valid)
    e.target.validity.valid ? setTitleError(false) : setTitleError(true)
  }
  // length
  const postLength = useAppSelector(selectPostLength)
  const [length, setLength] = useState('')
  const [timeLengthError, setTimeLengthError] = useState(false)
  const [timeLengthValidation, setTimeLengthValidation] = useState(true)
  const handleLength = (e: ChangeEvent<HTMLInputElement>) => {
    setLength(e.currentTarget.value)
    setTimeLengthValidation(v => v = e.target.validity.valid)
    e.target.validity.valid ? setTimeLengthError(false) : setTimeLengthError(true)
  }
  // unit
  const postTimeUnit = useAppSelector(selectPostTimeUnit)
  const [timeUnit, setTimeUnit] = useState(postTimeUnit)
  const [timeUnitError, setTimeUnitError] = useState(false)
  const [timeUnitValidation, setTimeUnitValidation] = useState(true)
  const handleTimeUnit = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeUnit(e.currentTarget.value)
    setTimeUnitValidation(e.target.validity.valid)
    e.target.validity.valid ? setTimeUnitError(false) : setTimeUnitError(true)
  }
  // area tags
  const postAreaTags = useAppSelector(selectPostTags)
  const postAreaTagsMemoied = useAppSelector(selectPostAreaTags)
  const [areaTags, setAreaTags] = useState(postAreaTagsMemoied)
  const [checkedTags, setCheckedTags] = useState<string[]>(postAreaTags)
  const [areaTagError, setAreaTagError] = useState<boolean | null>(null)
  const [areaTagValidation, setAreaTagValidation] = useState(true)
  const handleAreaTag = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    // select checked tags
    const checked = e.target.checked
    const tags = [...areaTags]
    const clickedTag = tags.find((t) => t.id === id)
    if (clickedTag !== undefined) clickedTag.checked = checked
    const checkedTagsArray = tags.filter((t) => t.checked === true)
    // it should be update the tags list data at every click
    let updatingCheckedTags: string[] = []
    checkedTagsArray.forEach((t) => { if (t.checked) updatingCheckedTags.push(t.name) })
    setAreaTags(tags)
    setCheckedTags(updatingCheckedTags)
    // validation
    const isCheced = checkedTagsArray.length > 0 ? true : false
    setAreaTagValidation(isCheced)
    isCheced ? setAreaTagError(false) : setAreaTagError(true)
  }
  // depart province
  const postDepartProvince = useAppSelector(selectPostDepartProvince)
  const [departPro, setDepartPro] = useState(postDepartProvince)
  const [departProvinceValidation, setDepartProvinceValidation] = useState(true)
  const [departProError, setDepartProError] = useState<boolean | null>(null)
  const [cityList, setCityList] = useState<CityProp[] | undefined>([])
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
  const [checkedUpdateFeatures, setCheckedUpdateFeatures] = useState<string[]>([])
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
  const postDestinations = useAppSelector(selectPostDestinations)
  const [destinations, setDestinations] = useState<DestinationProp[]>([])
  useEffect(() => {
    setDestinations(postDestinations)
  }, [postDestinations])
  const [destinationValidation, setDestinationValidation] = useState(true)
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
  const handleShowUpdateDestination = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    setShowUpdateDest(true)
    const selectedDest = destinations.find((d) => d.id === id)
    if (selectedDest !== undefined) {
      const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === selectedDest.spotProvince)
      setUpdateSpotId(selectedDest.id)
      setUpdateCityList(filterCityList)
      setUpdateSpotName(selectedDest.spotName)
      setUpdateDestPro(selectedDest.spotProvince)
      setUpdateDestCity(selectedDest.spotCity)
      setCheckedUpdateFeatures(selectedDest.spotFeatures)
      const getCheckedFeatures = updateFeatures.map(f => {
        if (selectedDest.spotFeatures.find((s: any) => f.name === s.name)) {
          return {
            ...f,
            checked: true
          }
        }
        return f
      })
      setUpdateFeatures(getCheckedFeatures)
      setCheckedUpdateActivities(selectedDest.spotActivities)
      const getCheckedActivities = updateActivities.map(a => {
        if (selectedDest.spotActivities.find((s: any) => a.name === s.name)) {
          return {
            ...a,
            checked: true
          }
        }
        return a
      })
      setUpdateActivities(getCheckedActivities)
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
  const [updateSpotNameError, setUpdateSpotNameError] = useState<boolean | null>(null)
  const [updateSpotNameValidation, setUpdateSpotNameValidation] = useState(true)
  const handleUpdateSpotName = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateSpotName(e.currentTarget.value)
    setUpdateSpotNameValidation(e.target.validity.valid)
    e.target.validity.valid ? setUpdateSpotNameError(false) : setUpdateSpotNameError(true)
  }
  const [updateDestPro, setUpdateDestPro] = useState('')
  const [updateDestProError, setUpdateDestProError] = useState<boolean | null>(null)
  const [updateDestProValidation, setUpdateDestProValidation] = useState(true)
  const [updateCityList, setUpdateCityList] = useState<CityProp[]>([])
  const [updateDestCity, setUpdateDestCity] = useState('')
  let updateDefaultCity
  const handleUpdateDestProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdateDestPro(e.currentTarget.value)
    const filterCityList = cities.filter((city: { city: string, province: string }) => city.province === e.currentTarget.value)
    setUpdateCityList(filterCityList)
    updateDefaultCity = cities.find((c: CityProp) => c.province === e.currentTarget.value).city
    setUpdateDestCity(updateDefaultCity)
    setUpdateDestProValidation(e.target.validity.valid)
    e.target.validity.valid ? setUpdateDestProError(false) : setUpdateDestProError(true)
  }
  const handleUpdateDestCity = (e: ChangeEvent<HTMLSelectElement>) => setUpdateDestCity(e.currentTarget.value)
  const [updateFeatures, setUpdateFeatures] = useState(defaultFeatures)
  const [updateFeaturesError, setUpdateFeaturesError] = useState<boolean | null>(null)
  const [updateFeatureValidation, setUpdateFeatureValidation] = useState(true)
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
    const isChecked = checking.length > 0 ? true : false
    setUpdateFeatureValidation(isChecked)
    isChecked ? setUpdateFeaturesError(false) : setUpdateFeaturesError(true)
  }
  const [updateActivities, setUpdateActivities] = useState(defaultActivities)
  const [checkedUpdateActivities, setCheckedUpdateActivities] = useState<string[]>([])
  const [updateActivitiesError, setUpdateActivitiesError] = useState<boolean | null>(null)
  const [updateActivityValidation, setUpdateActivityValidation] = useState(true)
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
    const isChecked = checking.length > 0 ? true : false
    setUpdateActivityValidation(isChecked)
    isChecked ? setUpdateActivitiesError(false) : setUpdateActivitiesError(true)
  }
  const handleUpdateDestination = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    const destStatesValidations = [updateSpotNameValidation, updateDestProValidation, updateFeatureValidation, updateActivityValidation]
    updateSpotNameValidation || setUpdateSpotNameError(true)
    updateDestProValidation || setUpdateDestProError(true)
    updateFeatureValidation || setUpdateFeaturesError(true)
    updateActivityValidation || setUpdateActivitiesError(true)
    const copyDestinations = [...destinations]
    const updatingDest = copyDestinations.find((d) => d.id === id) as DestinationProp
    const getIndex = () => copyDestinations.findIndex((d) => d.id === id)
    const copyUpdatingDest = { ...updatingDest }
    if (destStatesValidations.every(d => d === true) && copyUpdatingDest !== undefined) {
      copyUpdatingDest.spotName = updateSpotName
      copyUpdatingDest.spotProvince = updateDestPro
      copyUpdatingDest.spotCity = updateDestCity
      copyUpdatingDest.spotFeatures = checkedUpdateFeatures
      copyUpdatingDest.spotActivities = checkedUpdateActivities
      copyDestinations.splice(getIndex(), 0, copyUpdatingDest)
      copyDestinations.splice(getIndex() + 1, 1)
      setDestinations(copyDestinations)
      handleCloseUpdateDestination()
    }
  }
  const handleDeleteDestination = (id: string) => {
    const copyDestinations = [...destinations]
    const updatedDestinations = copyDestinations.filter((d) => d.id !== id)
    setDestinations(updatedDestinations)
    handleCloseUpdateDestination()
  }
  const handlePostState = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.value) {
      case 'offline': setFileType(FileType.offline); break;
      case 'published': setFileType(FileType.published); break;
    }
  }
  // delete

  // file type
  const postFileType = useAppSelector(selectPostFileType)
  const [fileType, setFileType] = useState<FileType | null>(null)
  // submit
  const updatingPost: PostProp = {
    id: postId,
    fileType: fileType,
    title: title,
    length: length,
    unit: timeUnit,
    areaTags: checkedTags,
    departProvince: departPro,
    departCity: departCity,
    destinations: destinations
  }
  const validationPost = () => {
    titleValidation || setTitleError(true)
    timeLengthValidation || setTimeLengthError(true)
    timeUnitValidation || setTimeUnitError(true)
    areaTagValidation || setAreaTagError(true)
    departProvinceValidation || setDepartProError(true)
    destinationValidation || setDestinationError(true)
    const validation = [titleValidation, timeLengthValidation, timeUnitValidation, areaTagValidation, departProvinceValidation, destinationValidation]
    if (validation.every(v => v === true)) {
      return true
    }
    return false
  }
  const handleSubmit = () => {
    switch (fileType) {
      case 'offline': dispatch(updatePost({ postId, updatingPost })); break;
      case 'published': validationPost() && dispatch(updatePost({ postId, updatingPost })); break;
    }
  }
  // 1. get the whole post
  useEffect(() => {
    dispatch(getPost({ postId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 2. update state from store
  useEffect(() => {
    setTitle(postTitle)
    setLength(postLength)
    setTimeUnit(postTimeUnit)
    setAreaTags(postAreaTagsMemoied)
    setCheckedTags(postAreaTags)
    setDepartPro(postDepartProvince)
    setCityList(cities.filter((city: { city: string, province: string }) => city.province === postDepartProvince))
    setFileType(postFileType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post])
  console.log('done ... ')

  return (
    <MainLayout>
      <div>
        {/* page title */}
        <h2 className="text-2xl font-bold">Edit</h2>
        {/* main content */}
        {
          postLoading
            ? <div>Loading</div>
            : postError !== null
              ? <div> Loading error: {postError} </div>
              : <div className="max-w-3xl">
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
                            defaultValue={post?.title}
                            onChange={handleTitle}
                            required
                            minLength={3}
                            maxLength={100}
                            className="block mt-1 p-1 w-full border border-slate-300 
                        focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                          placeholder:text-sm placeholder:text-slate-300
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-100"
                            placeholder="place, features, group of target users will be good keywords"
                          />
                          {
                            titleError === null
                              ? <span className='text-xs text-slate-500'>Please input at lease 3 and no more than 100 charactors</span>
                              : titleError
                                ? <span className='text-xs text-pink-500'>Please input at lease 3 and no more than 100 charactors</span>
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
                                defaultValue={post?.length}
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
                                    defaultTimeUnits.map((t) => <label key={`${t.id}+${t.value}`} className="inline-flex items-center">
                                      <input
                                        type="radio"
                                        value={t.value}
                                        checked={t.value == postTimeUnit}
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
                            (timeLengthError === false && timeUnitError === false)
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
                                      value={t.name}
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
                            defaultProvince={postDepartProvince}
                            defaultCity={departCity}
                            provinceList={regions}
                            cityList={cityList}
                            handleProvince={handleDepartProvince}
                            handleCity={handleCity}
                          />
                          {
                            departProError
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
                            destinations?.map((d: DestinationProp, index: number) => <div
                              key={`${index}+${d.spotName}`}
                              className='flex justify-between mt-2 hover:text-indigo-500'>
                              <div className='w-96 overflow-hidden'>
                                <span>{d.spotName}</span>
                              </div>
                              <div>
                                <button className='rounded border-indigo-500' onClick={e => handleShowUpdateDestination(e, d.id)}>
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
                              destinationError
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
                            updateSpotNameError={updateSpotNameError}
                            handleUpdateSpotName={handleUpdateSpotName}
                            updateDestPro={updateDestPro}
                            updateDestProError={updateDestProError}
                            handleUpdateDestProvince={handleUpdateDestProvince}
                            updateDestCity={updateDestCity}
                            handleUpdateDestCity={handleUpdateDestCity}
                            updateCityList={updateCityList}
                            updateFeatures={updateFeatures}
                            updateFeaturesError={updateFeaturesError}
                            handleUpdateFeature={handleUpdateFeature}
                            updateActivities={updateActivities}
                            updateActivitiesError={updateActivitiesError}
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
                    <DelConfirmDialog />
                    <div>
                      {
                        postStates.map((s) => <label key={`${s.id}+${s.value}`} className="inline-flex items-center">
                          <input
                            type="radio"
                            value={s.value}
                            onChange={handlePostState}
                            checked={s.value === fileType}
                            required
                            className="form-radio"
                            name="radio-direct" />
                          <span className="ml-2 mr-8">{s.name}</span>
                        </label>)
                      }
                      <button
                        className="ml-8 py-2 px-4 bg-emerald-500 text-white rounded"
                        onClick={handleSubmit}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        }
      </div>
    </MainLayout>
  )
}

export default function EditPostProvider() {
  return (
    <Provider store={store}>
      <EditPost />
    </Provider>
  )
}