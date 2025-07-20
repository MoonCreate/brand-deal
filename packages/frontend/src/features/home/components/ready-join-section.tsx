export function ReadyJoinSection() {
  return (
    <div className="flex flex-col py-6 -mx-30 h-screen">
      <div className="bg-blacked rounded-xl flex flex-col p-5 h-full justify-center">
        <div className="w-max self-center ">
          <h2 className="text-9xl font-karantina text-white">
            READY TO JOIN WITH US ?
          </h2>
          <div className="flex gap-6 justify-between [&>button]:grow mt-6">
            <button className="bg-white p-4 font-karantina text-blacked text-4xl rounded-xl">
              JOIN AS BRAND
            </button>
            <button className="bg-white p-4 font-karantina text-blacked text-4xl rounded-xl">
              JOIN AS INFLUENCER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
