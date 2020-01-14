import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { startSearch, setFilter } from '../../actions/jobActions';
import MapSearch from './JobSearch/MapSearch';
import SearchResult from './JobSearch/SearchResult';
import JobFilter from './JobFilter';
import AreaSelect from '../common/AreaSelect';
import FilterSummary from './JobSearch/FilterSummary';
import PageLoading from '../common/PageLoading';

const DEFAULT_PAGE_SIZE = 12;

function JobSearch(props) {
    const filter = useSelector(state => state.job.searchFilter);
    const currentPage = useSelector(state => state.job.currentPage);
    const dispatch = useDispatch();

    const [useMap, setUseMap] = useState(false);
    const [filterOpened, setFilterOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        dispatch(startSearch(filter, currentPage, DEFAULT_PAGE_SIZE));
        window.scrollTo(0, 0);
    }, [dispatch, filter, currentPage])

    const handleAreaChange = areaId => {
        let newFilter = { ...filter };
        newFilter.area = areaId ? areaId : undefined;

        // setFilter(newFilter);
        dispatch(setFilter(newFilter));
    }

    const handleSaveFilter = savedFilter => {
        setFilterOpen(false);
        let newFilter = { ...filter };
        newFilter = Object.assign(newFilter, savedFilter);
        // setFilter(newFilter);
        dispatch(setFilter(newFilter));
    }

    const handleMapChange = data => {
        // console.log(data);
        console.log('Not impremented yet');
    }

    return (
        <div className="jobSearch">
            <div className="jobSearch__fixedArea">
                <h1 className="is-size-2 is-size-3-mobile has-text-grey-dark">仕事検索</h1>
                <div className="jobSearch__areaFilter level">
                    <div className="level-item">
                        <h4 className="is-hidden-mobile u-margin-small">エリア</h4>
                        <AreaSelect onChange={handleAreaChange} emptyString="エリア指定無し" value={filter.area} />
                    </div>
                    {/* <div className="level-item">
                        <h4 className="is-hidden-mobile">表示方法</h4>
                        <div className="buttons has-addons" role="group">
                            <button type="button" className="button" onClick={() => setUseMap(false)}>
                                <span className="icon is-medium"><i className="fas fa-lg fa-list"></i></span>
                            </button>
                            <button type="button" className="button" onClick={() => setUseMap(true)}>
                                <span className="icon"><i className="fas fa-lg fa-map-marked-alt"></i></span>
                            </button>
                    </div>
                    </div> */}
                    <div className="level-item">
                        <h4 className="is-hidden-mobile">フィルタ</h4>
                        <button type="button" onClick={() => setFilterOpen(!filterOpened)} className="level-item button is-primary jobSearch__toggleFilter">
                            <span className="icon"><i className="fas fa-bars"></i></span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`jobSearch__filter${filterOpened ? ' active' : ''}`}>
                <JobFilter onSaveFilter={(filter) => handleSaveFilter(filter)} />
            </div>
            <FilterSummary filter={filter} />
            <div className="jobSearch__container">
                {
                    useMap ? <MapSearch onChange={handleMapChange} /> : <SearchResult pageSize={DEFAULT_PAGE_SIZE} />
                }
               <PageLoading animationClass="fade" />
            </div>
        </div>
    )
}

export default JobSearch;
