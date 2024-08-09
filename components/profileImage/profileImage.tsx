'use client'

type props = {
    userName:string;
    unreadMessage: number
}
const ProfileImage: React.FC<props> = ({userName, unreadMessage}) => {
    return(
    <div>
        <article className="relative inline-flex w-10 h-10 justify-center items-center p-3 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300">
        {userName}
        {unreadMessage > 0 ? <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{unreadMessage}</div> : null}
        </article>
    </div>
    )
}

export default ProfileImage