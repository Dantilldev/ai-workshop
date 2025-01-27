import Link from 'next/link';

export default function Card({image, title, description, link}) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 hover:opacity-90">
      <Link href={link}>
        <div>
          <img className="rounded-t-lg w-full h-60 " src={image} alt={title} />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
