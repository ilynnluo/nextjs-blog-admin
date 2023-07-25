import MainLayout from "@/app/layout/layout"

export default function CreatePost() {
  return (
    <MainLayout>
      <div className="py-1">
        <h2 className="text-2xl font-bold">Create</h2>
        <div className="max-w-3xl">
          <div className="grid grid-cols-1">
            <div className="mt-8 px-4 py-2 border-l-4 border-indigo-500">
              General
            </div>
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
            {/* select departure */}
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
            {/* select desitinations */}
            <div className="mt-12 px-4 py-2 border-l-4 border-indigo-500">
              Destinations
            </div>
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
            <div className="mt-8">
              <button className="py-2 px-4 bg-emerald-500 text-white rounded">
                Add Desitination
              </button>
            </div>
            {/* main content */}
            <div className="mt-12 px-4 py-2 border-l-4 border-indigo-500">
              Content
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}