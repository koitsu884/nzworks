import React, { useEffect } from 'react';
import useForm, { FormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addNewJob, updateJob } from '../../actions/jobActions';
import { setLoading } from '../../actions/commonActions';

import { jobCategories, workTypes, tagNames, englishLevels } from '../../constants/jobFilterValues';

import client from '../../utils/client';
import Alert from '../../utils/alert';
import getAreaFromLocation from '../../utils/getAreaFromLocation';

import Spinner from '../common/Spinner';
import SelectField from '../form/SelectField';
import TextField from '../form/TextField';
import TagField from '../form/TagField';
import AreaField from '../form/AreaField';
import AddressField from '../form/AddressField';


function JobEdit(props) {
    const methods = useForm();
    const { setValue, watch } = methods;
    const dispatch = useDispatch();
    const loading = useSelector(state => state.common.loading);
    const user = useSelector(state => state.user.currentUser);
    const areaList = useSelector(state => state.common.areaList);

    const jobLocation = watch('location');
    const jobId = props.match.params.id;

    useEffect(() => {
        if (jobId) {
            dispatch(setLoading(true));
            client.get('job/' + jobId)
                .then(response => {
                    setValue("title", response.data.title);
                    setValue("details", response.data.details);
                    setValue("area", response.data.area ? response.data.area._id : '');
                    setValue("jobCategory", response.data.jobCategory);
                    setValue("workType", response.data.workType);
                    setValue("englishLevel", response.data.englishLevel);
                    setValue("tags", response.data.tags);
                    setValue("address", response.data.address);
                    setValue("email", response.data.email);
                    setValue("phone", response.data.phone);
                })
                .catch(error => {
                    Alert.error("詳細データの取得に失敗しました");
                })
                .finally(() => {
                    dispatch(setLoading(false));
                })
        }
    }, [jobId, setValue, dispatch])

    useEffect(() => {
        if (!user) return;

        let { address, location } = user.profile;
        if (address) {
            setValue("address", address)
        }
        if (location) {
            setValue('location', {
                lat: location.coordinates[1],
                lng: location.coordinates[0],
            });
        }
        if (user.profile.phone) {
            setValue('phone', user.profile.phone)
        }
        setValue('email', user.email);
    }, [user, setValue])

    useEffect(() => {
        if (jobLocation) {
            let area = getAreaFromLocation(areaList, jobLocation);
            if (area) {
                setValue('area', area._id);
            }
        }
    }, [setValue, jobLocation, areaList])

    const onSubmit = fd => {
        let data = { ...fd };
        if (!fd.area) {
            data.area = null;
        }
        if (!fd.englishLevel) {
            data.englishLevel = '';
        }
        if (!fd.workType) {
            data.workType = '';
        }

        if (fd.location) {
            data.location = {
                type: "Point",
                coordinates: [fd.location.lng, fd.location.lat]
            };
        }

        if (jobId) {
            dispatch(updateJob(jobId, data));
        }
        else {
            dispatch(addNewJob(data));
        }
    };


    return (
        <div className="container">
            {
                loading ? <Spinner cover={true} /> : null
            }
            <FormContext {...methods} >
                <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
                    <TextField
                        label="タイトル"
                        type="text"
                        className="field"
                        placeholder="求人広告のタイトルを入力してください"
                        name="title"
                        registerOptions={{ required: true, maxLength: 100 }}
                    />
                    <TextField
                        label="詳細"
                        type="textarea"
                        placeholder="求人の詳細を入力してください"
                        name="details"
                        className="field"
                        rows={20}
                        registerOptions={{ required: true, maxLength: 10000 }}
                    />
                    <div className="u-flex-responsive">
                        <div className="u-margin-small u-flex-grow" style={{ maxWidth: '90rem' }}>
                            <section className="section has-background-light u-margin-bottom-small">
                                <h3>この求人の連絡手段</h3>
                                <div className="u-flex u-flex-wrap">
                                    <TextField
                                        label="連絡先メールアドレス"
                                        type="email"
                                        className="field u-margin-small"
                                        placeholder="メールアドレスを入力してください"
                                        name="email"
                                        registerOptions={{ maxLength: 100, required: true }}
                                    />
                                    <TextField
                                        label="連絡先電話番号"
                                        type="phone"
                                        className="field u-margin-small"
                                        placeholder="電話番号を入力してください"
                                        name="phone"
                                        registerOptions={{ maxLength: 100 }}
                                    />
                                </div>
                            </section>
                            <section className="section has-background-light">
                                <h3>その他詳細</h3>
                                <div className="u-flex u-flex-wrap">
                                    <SelectField
                                        label="職種"
                                        name="jobCategory"
                                        className="field u-margin-small"
                                        emptyString="-- 選択してください --"
                                        dataList={jobCategories}
                                        registerOptions={{ required: true }}
                                    />
                                    <SelectField
                                        label="雇用形態"
                                        name="workType"
                                        className="field u-margin-small"
                                        emptyString="不問"
                                        dataList={workTypes}
                                    />
                                    <SelectField
                                        label="必要英語力"
                                        name="englishLevel"
                                        className="field u-margin-small"
                                        emptyString="不問"
                                        dataList={englishLevels}
                                    />
                                </div>
                                <TagField
                                    label="アピールポイント（複数選択可）"
                                    name="tags"
                                    className="field"
                                    dataList={tagNames}
                                />
                            </section>
                        </div>
                        <div className="u-margin-small" style={{ minWidth: '30rem' }}>
                            <section className="section has-background-light">
                                <h3>勤務先</h3>
                                <AddressField
                                    label="住所"
                                    placeholder="勤務先の住所を入力してください"
                                />
                                <AreaField
                                    label="エリア"
                                    name="area"
                                    className="field u-margin-small"
                                />
                            </section>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-primary is-large u-margin-auto">{jobId ? '更新する' : '求人を追加する'}</button>
                        </div>
                    </div>
                </form>
            </FormContext>
        </div>
    )
}

export default JobEdit;