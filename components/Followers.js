import Link from 'next/link'

function Followers() {
    return (
        <div className="bg-gray-200 w-full p-3 mt-5 rounded-lg space-y-4">
            <h1 className="font-semibold">Who to follow</h1>
            <div className="flex flex-col space-y-4">
            <div className="flex space-x-2 justify-between">
                <img src = 'https://pbs.twimg.com/profile_images/1454912483248930822/_hO4WPRC_400x400.png' className="w-10 h-10 rounded-full"></img>
                <div className="flex-1">
                    <h2 className="text-sm font-semibold">Microsoft</h2>
                    <p className="text-xs">@Microsoft</p>
                </div>
                <button className="bg-blue-400 text-white px-2 rounded-lg">Follow</button>
            </div>

            <div className="flex space-x-2 justify-between">
                <img src = 'http://www.nasa.gov/sites/default/files/thumbnails/image/for_press_release.jpg' className="w-10 h-10 rounded-full"></img>
                <div className="flex-1">
                    <h2 className="text-sm font-semibold">SpaceX</h2>
                    <p className="text-xs">@SpaceX</p>
                </div>
                <button className="bg-blue-400 text-white px-2 rounded-lg">Follow</button>
            </div>

            <div className="flex space-x-2 justify-between">
                <img src = 'https://gamingnews.cyou/img/1649198144_Wireless-headphones-Amazon-just-slashed-the-price-of-just-about.png' className="w-10 h-10 rounded-full"></img>
                <div className="flex-1">
                    <h2 className="text-sm font-semibold">Amazon</h2>
                    <p className="text-xs">@Amazon</p>
                </div>
                <button className="bg-blue-400 text-white px-2 rounded-lg">Follow</button>
            </div>

            <Link href = "#" className="text-sm text-blue-600">Show More</Link>
        </div>
        </div>
    )
}

export default Followers