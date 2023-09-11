import React from 'react';
import {PickerView, PickerViewColumn, View} from '@tarojs/components';
import dayjs from 'dayjs';
import range from 'lodash/range';
import classnames from 'classnames';
import timeParse from './timeParse';
import style from './style.module.scss';

const TimeStepView = ({className, value, onChange, step, minTime, maxTime, lineHeight}) => {
    const min = dayjs(timeParse(minTime)), max = dayjs(timeParse(maxTime)), current = dayjs(timeParse(value));
    const currentValue = Math.floor(current.diff(min, 'minute') / step);
    return <PickerView className={classnames(style['picker-view'], className)} immediateChange
                       indicatorStyle={`height:${lineHeight};`}
                       value={[currentValue]} onChange={(e) => {
        const value = e.detail.value;
        onChange?.(min.add(value[0] * step, 'minute').format('HH:mm'));
    }}>
        <PickerViewColumn>{range(Math.floor(max.diff(min, 'minute') / step)).map((i, index) => {
            return <View className={classnames(style['picker-column'], {
                [style['is-active']]: currentValue === index
            })}
                         style={{lineHeight}}>{min.add(i * step, 'minute').format('HH:mm')}</View>
        })}</PickerViewColumn>
    </PickerView>
};

TimeStepView.defaultProps = {
    minTime: '00:00', maxTime: '24:00', step: 60, lineHeight: '34px', value: '8:00'
};

export default TimeStepView;
