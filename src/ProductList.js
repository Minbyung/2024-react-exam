import ProductListItem from "./ProductListItem";

export default function ProductLIst({className}) {
    return<>
        <div className={className}>
            <ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-5'>
                <li><ProductListItem imgNo={1} name="product 1" price="100,000"/></li>
                <li><ProductListItem imgNo={2} name="product 2" price="200,000"/></li>
                <li><ProductListItem imgNo={3} name="product 3" price="300,000"/></li>
                <li><ProductListItem imgNo={4} name="product 4" price="400,000"/></li>
                <li><ProductListItem imgNo={5} name="product 5" price="500,000"/></li>
                <li><ProductListItem imgNo={6} name="product 6" price="600,000"/></li>
            </ul>
        </div>
    </>
}