import React from 'react'
import {createIconSetFromIcoMoon} from 'react-native-vector-icons'
import {IconProps as RNVIIconProps} from 'react-native-vector-icons/Icon'

import icoMoonConfig from '../../assets/fonts/selection.json'

const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig)

type IconProps = Partial<RNVIIconProps>
export type Icon = (props: IconProps) => typeof CustomIcon
export const Icons = {
  elsa: (props: IconProps) => <CustomIcon name="elsa" size={24} {...props} />,
  home: (props: IconProps) => <CustomIcon name="icon_feed" size={24} {...props} />,
  profile: (props: IconProps) => <CustomIcon name="profile" size={24} {...props} />,
  log: (props: IconProps) => <CustomIcon name="log" size={24} {...props} />,
  analysis: (props: IconProps) => <CustomIcon name="analysis" size={24} {...props} />,
  chevron: (props: IconProps) => <CustomIcon name="arrow" size={24} {...props} />,
  backArrow: (props: IconProps) => <CustomIcon name="back_arrow" size={24} {...props} />,
  tick: (props: IconProps) => <CustomIcon name="icon_tick" size={24} {...props} />,
  faceSad: (props: IconProps) => <CustomIcon name="face_sad" size={16} {...props} />,
  faceHappy: (props: IconProps) => <CustomIcon name="face_happy" size={16} {...props} />,
  steps: (props: IconProps) => <CustomIcon name="icon_steps" size={16} {...props} />,
  wellBeing: (props: IconProps) => <CustomIcon name="icon_wellbeing" size={16} {...props} />,
  activities: (props: IconProps) => (
    <CustomIcon name="icon_physical_activity" size={16} {...props} />
  ),
  smoking: (props: IconProps) => <CustomIcon name="icon_cigarette" size={16} {...props} />,
  weight: (props: IconProps) => <CustomIcon name="icon_weight" size={16} {...props} />,
  wellBeingBest: (props: IconProps) => (
    <CustomIcon name="icon_wellbeing_best" size={16} {...props} />
  ),
  wellBeingWorst: (props: IconProps) => (
    <CustomIcon name="icon_wellbeing_worst" size={16} {...props} />
  ),
  activityBest: (props: IconProps) => (
    <CustomIcon name="icon_physical_activity_best" size={16} {...props} />
  ),
  activityWorst: (props: IconProps) => (
    <CustomIcon name="icon_physical_activity_worst" size={16} {...props} />
  ),
  close: (props: IconProps) => <CustomIcon name="close" size={34} {...props} />,
  showPassword: (props: IconProps) => <CustomIcon name="icon_show_password" size={24} {...props} />,
  hidePassword: (props: IconProps) => <CustomIcon name="icon_hide_password" size={24} {...props} />,
  stepsTrail: (props: IconProps) => <CustomIcon name="group" {...props} />,
  ceLogo: (props: IconProps) => <CustomIcon name="ce_logo" size={24} {...props} />,
  help: (props: IconProps) => <CustomIcon name="icon_help" size={24} {...props} />,
  cogwheel: (props: IconProps) => <CustomIcon name="icon_cogwheel" size={24} {...props} />,
  Categories: {
    pain: (props: IconProps) => <CustomIcon name="icon_pain" size={24} {...props} />,
    fatigue: (props: IconProps) => <CustomIcon name="icon_fatigue" size={24} {...props} />,
    joints: (props: IconProps) => <CustomIcon name="icon_tender_swollen" size={24} {...props} />,
    wellBeing: (props: IconProps) => <CustomIcon name="icon_wellbeing" size={24} {...props} />,
    steps: (props: IconProps) => <CustomIcon name="icon_steps" size={24} {...props} />,
    activities: (props: IconProps) => (
      <CustomIcon name="icon_physical_activity" size={24} {...props} />
    ),
    smoking: (props: IconProps) => <CustomIcon name="icon_cigarette" size={24} {...props} />,
    weight: (props: IconProps) => <CustomIcon name="icon_weight" size={24} {...props} />,
    medication: (props: IconProps) => <CustomIcon name="icon_medication" size={24} {...props} />,
    notes: (props: IconProps) => <CustomIcon name="icon_notes" size={24} {...props} />,
    customItems: (props: IconProps) => <CustomIcon name="icon_tick" size={24} {...props} />,
  },
}
export type IconKey = keyof typeof Icons
