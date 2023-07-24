import MainLayout from "@/app/layout/layout"

export default function CreatePost() {
  return (
    <MainLayout>
      <div className="py-1">
        <h2 className="text-2xl font-bold">Create</h2>
        <div className="max-w-3xl">
          <div className="grid grid-cols-1">
            {/* input title */}
            <label className="block mt-8">
              <span className="text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                Title</span>
              <input
                type="text"
                className="form-input mt-1 p-1 block w-full border border-slate-500
                        focus:border-blue-500 focus-visible:outline-none focus-visible:ring
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
                  className="form-input mt-1 p-1 w-24 block border border-slate-500
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
              <legend className="text-gray-700">Area Tags</legend>
              <div className="flex mt-2">
                <div className="mr-8">
                  <label className="inline-flex items-center">
                    <input className="form-checkbox" type="checkbox"/>
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
        </div>
      </div>
    </MainLayout>
  )
}