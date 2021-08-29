import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ListComponent = ({onCountrySelected}) => {

    const [countries, setCountries] = useState([]);
    let countries_arr = [];

    const fetchCountries = () => {
        axios.get('/api/countries/list').then(res=>{

            if(res){

                countries_arr = res.data.response
                countries_arr.unshift("All");
                console.log('arr' + countries_arr)
                let selectedCountry = countries_arr[0];
                onCountrySelected(selectedCountry);
                setCountries(countries_arr)
                console.log('arr1' + countries)
            }else{
                setCountries(null)
            }

        }).catch(error=>{
            setCountries(null);
            console.error(error)
        })
    };

    useEffect(() => {
        fetchCountries()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSelectedCountries = (e, option, item) => {
        const index = e.target.selectedIndex;
        console.log('i' + index)
        const selectedCountry = countries[index]
        onCountrySelected(selectedCountry);
        console.log('sel' + selectedCountry);
    };

    if (countries !== null && countries.length > 0){
        
        return (
            <div className="lc-main-div">
                <h6 className="fg-greyMouse">Country</h6>
                <select data-clear-button onChange={handleSelectedCountries}>
                    {
                        countries.map((item, index) => <option key={index} value={item}>{item}</option>)
                    }
                </select>
            </div>
        )
    }else{
        return (
            <div className="lc-main-div">
                <h6 className="fg-grayMouse">It appears the API is not available ! Thats bad</h6>
            </div>
        )

    }
}

export default ListComponent
