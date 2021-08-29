import React, {  useState } from 'react'
import ChartsComponent from './charts.component';
import ListComponent from './list.component';

const MainComponent = () => {
    const [country, setCountry] = useState(undefined);

    const onCountrySelected = (country) => {
        setCountry(country)
        console.log('coun' + country)
        
    };


    return (
        <div>
            <div className="row">
                <div className="cell-3">
                    <ListComponent onCountrySelected={onCountrySelected} />
                </div>
            </div>
            <div className="row">
                <div className="cell-12">
                    <ChartsComponent country={country} />
                </div>
            </div>
        </div>
    )
}

export default MainComponent
