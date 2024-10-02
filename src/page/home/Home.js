import React, { useEffect, useState } from 'react'
import { PageWithNavbar } from '../../common/components'
import { getBreeds, getImages } from '../../common/apis/images'
import { message, Select, Tooltip } from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loaderReducer';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [breed, setBreed] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState([]);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = async () => {
        dispatch(setLoading(true));
        const breeds = selectedBreed.length > 0 ? selectedBreed.join(',') : null;
        try {
            let data = await getImages({
                has_breeds: 1,
                limit: pageSize,
                page: currentPage,
                order: sortOrder,
                breed_ids: breeds
            });
            if (data.length === 0) {
                return message.warning('No data found');
            }
            setData(data);
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
            console.log(error);
            message.error(error.message || 'Error while fetching data');
        }
    }

    const getBreedsData = async () => {
        dispatch(setLoading(true));
        try {
            let data = await getBreeds();
            console.log(data);
            setBreed(data);
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
            console.log(error);
            message.error(error.message || 'Error while fetching data');
        }
    }


    const handleReset = () => {
        setSelectedBreed([]);
        setSortOrder('asc');
        setPageSize(12);
        setCurrentPage(1);
        getData();
    }


    useEffect(() => {
        getData();
        getBreedsData();
    }, [currentPage, pageSize]);  // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <PageWithNavbar>
            <div className="flex flex-col lg:px-32 md:px-20 px-12 gap-12 mb-12">
                <span className='text-2xl font-bold text-center'>Cats Images{`(${data ? data.length : 0})`}</span>

                {/* filters section */}
                <div className="flex flex-row justify-end lg:gap-12 md:gap-8 gap-4">
                    <Select name="order" id="order"
                        className='border border-black outline-none focus:outline-none focus:border-black focus:ring-black rounded-md lg:w-64 md:w-32 w-24'
                        onChange={(e) => {
                            setSortOrder(e);
                        }}
                        defaultValue={sortOrder}
                        value={sortOrder}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Select>
                    <Select name="breed" id="breed"
                        mode='multiple'
                        className='border border-black outline-none focus:outline-none focus:border-black focus:ring-black rounded-md lg:w-64 md:w-32 w-24'
                        onChange={(e) => {
                            setSelectedBreed(e);
                        }}
                        virtual={false}
                        maxTagCount={'responsive'}
                        value={selectedBreed}
                    >
                        {breed.map((item, index) => {
                            return (
                                <option key={index} value={item.id}>{item.name}</option>
                            )
                        })}
                    </Select>
                    <div className="flex flex-row gap-4">
                        <button className='border border-black rounded-md py-1 px-3' onClick={getData}><SearchOutlined /></button>
                        <button className='border border-black rounded-md py-1 px-3'
                            onClick={handleReset}
                        >
                            <RedoOutlined />
                        </button>
                    </div>
                </div>

                {/* images section */}
                <div className="flex flex-row flex-wrap lg:gap-y-12 md:gap-y-8 gap-y-4 w-full lg:gap-x-8 md:gap-x-4 gap-x-2">
                    {data.map((image, index) => {
                        return (
                            <div key={index} className="bg-[#f6f6f6] lg:h-96 md:h-80 h-64 rounded-2xl flex flex-col gap-4 shadow-lg hover:scale-105 duration-300 p-4 py-4 text-center">
                                <img src={image.url} alt={image.id} className='lg:h-64 md:h-40 md:w-40 h-32 w-32 rounded-xl lg:w-64 object-cover' />
                                <span className='text-xl font-medium'>
                                    <Tooltip title={image.breeds[0].name}>
                                        {image.breeds[0].name.slice(0, 10) + (image.breeds[0].name.length > 10 ? '...' : '')}
                                    </Tooltip>
                                </span>
                                <button className='border border-black rounded-md py-1 px-3'
                                    onClick={() => {
                                        navigate(`/details/${image.id}`);
                                    }}
                                >
                                    Details
                                </button>
                            </div>
                        )
                    })}
                </div>

                {/* pagination section */}
                <div className="flex flex-row justify-end gap-4">
                    <input className={`border border-black rounded-md py-1 px-2.5 w-8`} disabled value={currentPage} />
                    <button className={`border border-black rounded-md py-1 px-3 ${currentPage === 1 && 'border-opacity-50 opacity-50 cursor-not-allowed'}`} disabled={currentPage === 1}
                        onClick={() => {
                            setCurrentPage(currentPage - 1);
                        }}
                    >
                        Prev
                    </button>
                    <Select name="pageSize" id="pageSize"
                        onChange={(e) => {
                            setPageSize(e);
                        }}
                        className='w-16 border border-black rounded-md'
                        value={pageSize}
                    >
                        <Select.Option value={10}>10</Select.Option>
                        <Select.Option value={20}>20</Select.Option>
                        <Select.Option value={50}>50</Select.Option>
                    </Select>
                    <button className={`border border-black rounded-md py-1 px-3`}
                        onClick={() => {
                            setCurrentPage(currentPage + 1);
                        }}
                    >
                        Next
                    </button>
                </div>

            </div>
        </PageWithNavbar>
    )
}

export default Home