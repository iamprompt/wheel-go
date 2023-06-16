import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { format } from '~/utils/dayjs'
import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'

interface ReviewOfficialCommentProps {
  date: string
  comment: string
  isFlagged?: boolean
}

export function ReviewOfficialComment({
  date,
  comment,
  isFlagged = false,
}: ReviewOfficialCommentProps) {
  const { t } = useTranslation()

  return (
    <View
      style={{
        borderRadius: 8,
        borderColor: isFlagged
          ? COLORS.error[500]
          : COLORS['french-vanilla'][300],
        borderWidth: 1,
        padding: 12,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <MaterialIcons
            name={isFlagged ? 'flag' : 'local_police'}
            size={20}
            color={isFlagged ? COLORS.error[400] : COLORS.info[500]}
          />
          <Text
            style={{
              fontFamily: FONTS.LSTH_BOLD,
              fontSize: 12,
            }}
          >
            {t('reviews.additional_official_comment')}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: FONTS.LSTH_REGULAR,
            fontSize: 12,
            color: COLORS['french-vanilla'][500],
          }}
        >
          {format(date)}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: FONTS.LSTH_REGULAR,
          fontSize: 12,
          color: COLORS['french-vanilla'][500],
        }}
      >
        {comment}
      </Text>
    </View>
  )
}
