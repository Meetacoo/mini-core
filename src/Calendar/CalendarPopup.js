import React, { useState } from 'react';
import { Popup, SafeArea } from '@kne/antd-taro';
import style from './style.module.scss';
import useControlValue from '@kne/use-control-value';
import CalendarView from './CalendarView';
import classnames from 'classnames';
import { View } from '@tarojs/components';
import computedIsDisabled from './computedIsDisabled';

const CalendarPopup = ({ className, onClose, onCancel, isRootPortal, value, onChange, placeholder, ...props }) => {
  const [active, setActive] = useControlValue(props, {
    defaultValue: 'defaultOpen',
    value: 'open',
    onChange: 'onOpenChange'
  });
  const [current, setCurrent] = useState(value);
  return (
    <Popup
      className={classnames(style['popup'], 'adm-picker-popup')}
      isRootPortal={isRootPortal}
      hasSafeArea={false}
      position="bottom"
      open={active}
      onOpenChange={open => {
        if (open) {
          return;
        }
        setActive(false);
        onClose?.();
        setCurrent(value);
      }}
    >
      {active && (
        <>
          <View className={`adm-picker-header`}>
            <View
              className={`adm-picker-header-button`}
              onClick={() => {
                onCancel?.();
                setActive(false);
                onClose?.();
              }}
            >
              取消
            </View>
            <View className={`adm-picker-header-title`}>{placeholder}</View>
            <View
              className={classnames(`adm-picker-header-button`)}
              onClick={() => {
                setActive(false);
                onClose?.();
                if (
                  computedIsDisabled(current, {
                    minDate: props.minDate,
                    maxDate: props.maxDate,
                    disabledDate: props.disabledDate
                  })
                ) {
                  return;
                }
                onChange?.(current);
              }}
            >
              确定
            </View>
          </View>
          <CalendarView {...props} value={current} onChange={setCurrent} />
        </>
      )}
      <SafeArea position="bottom" />
    </Popup>
  );
};

CalendarPopup.defaultProps = {
  value: new Date(),
  placeholder: '请选择日期',
  isRootPortal: false
};

export default CalendarPopup;
