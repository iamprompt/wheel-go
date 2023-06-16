import { Modal as RNModal, View } from 'react-native'

import COLORS from '~/styles/colors'

type ModalProps<TModal> = {
  isVisible: boolean
  modal: (props: TModal) => JSX.Element | null
} & TModal

export function Modal<TModal>(props: ModalProps<TModal>) {
  const ModalContent = props.modal

  return (
    <RNModal visible={props.isVisible} animationType="fade" transparent>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.magenta[600],
          opacity: 0.6,
          flex: 1,
        }}
      />
      <View
        style={{
          padding: 16,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ModalContent {...props} />
      </View>
    </RNModal>
  )
}
