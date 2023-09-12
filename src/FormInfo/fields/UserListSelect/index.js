import {UserListSelect as CommonUserListSelect, withPopup} from '../../../Common';
import {withDecoratorList} from '@kne/react-form-antd-taro';
import React, {useMemo} from "react";
import classnames from "classnames";
import {View} from "@tarojs/components";

const ListSelectInner = (props) => {
    return <CommonUserListSelect {...props} hasSafeArea valueType="all" defaultValue={props.value}/>
}

const getValue = (value) => {
    return Object.prototype.toString.call(value) === '[object String]' ? value.value : value?.label
}

const UserListSelect = withDecoratorList(({render, placeholder, showPopup, value, multiple, ...props}) => {
    const label = useMemo(() => {
        if (!value) {
            return <View className="react-form__placeholder">{placeholder}</View>;
        }
        return multiple ? <View className={classnames('ellipsis')}>
            {Array.isArray(value) ? (value || []).map((value) => {
                return getValue(value)
            }).join('，') : ''}
        </View> : <View className={classnames('ellipsis')}>
            {Array.isArray(value) ? getValue(value[0]) : getValue(value)}
        </View>;
    }, [placeholder, multiple, value]);
    return render({
        ...props, label, value, placeholder, onClick: showPopup, multiple
    });
})(withPopup(ListSelectInner));

UserListSelect.defaultProps = {
    multiple: true
}

export default UserListSelect;

