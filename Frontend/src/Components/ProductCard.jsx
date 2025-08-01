const ProductCard = (props) => {
    let {title, description, imageUrl, productUrl} = props

  return (

    <div className="container max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="card" style={{ width: '13rem', padding: '10px 10px 10px 10px' }}>

          <a href="#"> <img className="rounded-t-lg" src={!imageUrl?"https://mir-s3-cdn-cf.behance.net/project_modules/disp/9dcb5f13833115.56035845a3c87.PNG":imageUrl} alt="" /> </a>
     
          <div className="p-5">
              <a href="#"> <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {title} </h5> </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {description} </p>
              <a href={productUrl} target="blank" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Read more <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/> </svg> </a>
          </div>
        </div>
    </div>

  );
};

export default ProductCard;