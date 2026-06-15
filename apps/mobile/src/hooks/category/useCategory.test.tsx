import React from 'react'
import { Text, Button } from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'
import { useCategory } from './useCategory'

function HookTester() {
  const { categoryColor, setCategoryColor, icon, setIcon, name, setName, iconComponent } =
    useCategory()

  const IconComp = iconComponent

  return (
    <>
      <Text testID="color">{categoryColor}</Text>
      <Text testID="icon">{icon}</Text>
      <Text testID="name">{name}</Text>
      <Button title="set-color" onPress={() => setCategoryColor('#123456')} />
      <Button title="set-icon" onPress={() => setIcon('storefront')} />
      <Button title="set-name" onPress={() => setName('Teste')} />
      {IconComp ? <IconComp testID="icon-comp" /> : null}
    </>
  )
}

describe('useCategory hook', () => {
  it('returns default values', () => {
    const { getByTestId } = render(<HookTester />)

    expect(getByTestId('color').props.children).toBe('#ff0000')
    expect(getByTestId('icon').props.children).toBe('heart')
    expect(getByTestId('name').props.children).toBe('')
  })

  it('updates values when setters are called', () => {
    const { getByTestId, getByText } = render(<HookTester />)

    fireEvent.press(getByText('set-color'))
    expect(getByTestId('color').props.children).toBe('#123456')

    fireEvent.press(getByText('set-icon'))
    expect(getByTestId('icon').props.children).toBe('storefront')

    fireEvent.press(getByText('set-name'))
    expect(getByTestId('name').props.children).toBe('Teste')
  })

  it('renders an icon component when available', () => {
    const { queryByTestId, getByText } = render(<HookTester />)

    expect(queryByTestId('icon-comp')).toBeTruthy()

    fireEvent.press(getByText('set-icon'))
    expect(queryByTestId('icon-comp')).toBeTruthy()
  })
})
