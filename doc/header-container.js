const { HeaderContainer } = miniCore;
const { Space } = antd;
const { View } = tarojsComponents;
const BaseExample = () => {
  return <HeaderContainer
    bgColor={'#ff8f1f'}
    extra={<View>extra</View>}
  >
    哈哈哈
  </HeaderContainer>;
};

render(<BaseExample />);
