function Cards(props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {props.data.map((item, index) => (
                item.author !== null && ( // Conditional rendering
                    <div
                        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                        key={index}
                    >
                        
                        
                        <div className="imgpart">
                                <img
                                    src={item.urlToImage || '/image.png'}  // Use default image if urlToImage is null
                                    alt="news thumbnail"
                                />
                                </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-semibold text-blue-600 hover:underline"
                            >
                                {item.title}
                            </a>
                            {item.description && (
                                <p className="text-gray-700 mt-2 text-sm flex-grow">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}

export default Cards;
