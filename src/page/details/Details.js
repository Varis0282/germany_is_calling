import React, { useEffect, useState } from 'react'
import { PageWithNavbar } from '../../common/components'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loaderReducer';
import { getImageDetails } from '../../common/apis/images';
import { message } from 'antd';
import _ from 'lodash';

const Details = () => {

    const [data, setData] = useState({});
    const [breed, setBreed] = useState({});


    const dispatch = useDispatch();

    const getDetails = async () => {
        dispatch(setLoading(true));
        let id = window.location.pathname.split('/')[2];
        try {
            let data = await getImageDetails(id);
            setData(data);
            setBreed(data.breeds[0]);
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
            console.log(error);
            message.error(error.message || 'Error while fetching data');
        }
    }


    useEffect(() => {
        getDetails();
    }, [])    // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PageWithNavbar>
            <div className="flex flex-col lg:px-32 md:px-20 px-12 gap-12 mb-12 w-full">
                <span className='text-2xl font-bold text-center'>Details {breed.name ? ' - ' + breed.name : ''}</span>

                <div className="flex flex-col lg:flex-row w-full">
                    <div className='w-1/2'>
                        <img src={data.url} alt="Cat" className="max-h-96" />
                    </div>
                    <div className="flex flex-col flex-wrap gap-2 w-1/2 max-h-96">
                        {breed && typeof breed === 'object' && Object.keys(breed).map((key) => {
                            if (typeof breed[key] !== 'object' && key !== 'id' && key !== 'url' && key !== 'image_id' && key !== 'breed_id' && key !== 'height' && key !== 'width' && key !== 'vetstreet_url' && key !== 'cfa_url' && key !== 'description' && key !== 'wikipedia_url' && key !== 'reference_image_id' && key !== 'temperament') {
                                return (
                                    <div key={key} className="flex flex-col lg:flex-row gap-2">
                                        <span className="font-bold">{_.startCase(key)} : </span>
                                        <span>{breed[key]}</span>
                                    </div>
                                );
                            } else if (typeof breed[key] === 'object') {
                                return Object.keys(breed[key]).map((subKey) => {
                                    return (
                                        <div key={subKey} className="flex flex-col lg:flex-row gap-2">
                                            <span className="font-bold">{_.startCase(key) + ' - ' + _.startCase(subKey)} : </span>
                                            <span>{breed[key][subKey]}</span>
                                        </div>
                                    );
                                });
                            }
                            return null;
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="font-bold">Temperament : <span className='font-normal'>{breed.temperament}</span></span>
                    <span className="font-bold">Description : <span className='font-normal'>{breed.description}</span></span>
                </div>

            </div>
        </PageWithNavbar>
    )
}

export default Details