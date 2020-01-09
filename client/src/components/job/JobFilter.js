import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { jobCategories, workTypes, englishLevels, tagNames } from '../../constants/jobFilterValues';
import PrettyTagSelector from '../common/PrettyTagSelector';
import Selector from '../common/Selector';

function JobFilter(props) {
    const initialFilter = useSelector(state => state.job.searchFilter);
    const [filter, setFilter] = useState({})

    useEffect(() => {
        setFilter(initialFilter)
    }, [initialFilter])

    const handleFilterChange = (name, data) => {
        let newFilter = {...filter};
        if(data){
            newFilter[name] = data;
        } else{
            newFilter[name] = undefined;
        }
        setFilter(newFilter);
    }

    const onSaveFilter = () => {
        props.onSaveFilter(filter);
    }

    let selectedTags = filter.tags ? filter.tags : []; 
    let selectedCategories = filter.jobCategory ? filter.jobCategory : []; 

    return (
        <div className="jobFilter bg-light p-3">
            <h4 className="is-size-3">職種</h4>
            <div className="jobFilter__">
                <PrettyTagSelector dataList={jobCategories} onChange={(data)=>handleFilterChange('jobCategory', data)} values={selectedCategories} />
            </div>
            <div className="u-flex-responsive">
                <div className="jobFilter__employType">
                    <h4 className="u-margin-top-small is-size-3">雇用形態</h4>
                    <Selector 
                        dataList={workTypes} 
                        onChange={e => handleFilterChange(e.target.name, e.target.value)}
                        name="workType"
                        value={filter.workType} 
                        emptyString='全て' 
                    />
                </div>
                <div  className="jobFilter__englishLevel">
                    <h4 className="u-margin-top-small is-size-3">必要英語力</h4>
                    <Selector 
                        dataList={englishLevels} 
                        onChange={e => handleFilterChange(e.target.name, e.target.value)}
                        name="englishLevel"
                        value={filter.englishLevel} 
                        emptyString='全て' 
                    />
                </div>
            </div>
            <h4 className="u-margin-top-small is-size-3">タグ</h4>
            <div >
            <PrettyTagSelector dataList={tagNames} onChange={(data) => handleFilterChange('tags', data)} values={selectedTags} />
            </div>
            <div className="field u-margin-medium">
                <button type="button" onClick={onSaveFilter} className="button is-success is-medium u-margin-auto">フィルターを適用する</button>
            </div>
        </div>
    )
}

JobFilter.propTypes = {
    onSaveFilter: PropTypes.func
}

export default JobFilter;