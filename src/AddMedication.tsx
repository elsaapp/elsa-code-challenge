import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Modal} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  SecondaryBlueButton,
  PrimaryBlueButton,
  TextInput,
  H2,
  Select,
  SelectItem,
  selectItemMapper,
} from '~/Components'
import type {AddMedicationRouteProps, RootNavigation} from '~/Root'
import {addMedication} from '~/Store/Actions'
import {
  MedicationFormData,
  MedicationProps,
  MedicationStrength,
  UnitVariants,
  AdministrationVariants,
  IMedicationWithId,
} from '~/Store/User'
import {validateAddMedicationForm} from '~/Utils'
import {medicationsSelector} from '~/Store/Selectors'

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#ccc', // TODO Replace with global color variable
    marginBottom: 10, // TODO Replace with global variable for margins
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  leftOfTwoColumns: {
    paddingRight: 5,
    width: '50%',
  },
  rightOfTwoColumns: {
    paddingLeft: 5,
    width: '50%',
  },
})

type AddMedicationProps = {
  navigation: RootNavigation
  route: AddMedicationRouteProps
}

// Make all Medicine props optional, including the nested strength
type AddMedicineForm = Partial<
  Omit<MedicationFormData, MedicationProps.STRENGTH> & {
    [MedicationProps.STRENGTH]: Partial<MedicationStrength>
  }
>

enum BarcodeUserTestStatus {
  SHOW_TEST = 'SHOW_TEST',
  SHOW_MODAL_INFO = 'SHOW_MODAL_INFO',
  HIDE_TEST = 'HIDE_TEST',
}

export const AddMedication: React.FC<AddMedicationProps> = ({navigation}) => {
  const dispatch = useDispatch()
  const medications = useSelector(medicationsSelector)
  const [form, setForm] = useState<AddMedicineForm>({})
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)
  const [isAddFromPreviousModalVisible, setIsAddFromPreviousModalVisible] = useState<boolean>(false)
  const [addFromPreviousMedication, setAddFromPreviousMedication] = useState<
    IMedicationWithId | undefined
  >(undefined)
  const [formErrors, setFormErrors] = useState([])
  const [barcodeTestStatus, setBarcodeTestStatus] = useState<BarcodeUserTestStatus>(
    BarcodeUserTestStatus.SHOW_TEST
  )

  type Timer = ReturnType<typeof setTimeout>

  const setFormProp = <T,>(prop: MedicationProps) => {
    return (value: T) => {
      setForm({
        ...form,
        [prop]: value,
      })
    }
  }

  const setBrandName = setFormProp<string>(MedicationProps.BRAND_NAME)
  const setSubstance = setFormProp<string>(MedicationProps.SUBSTANCE)
  const setAdministration = setFormProp<string>(MedicationProps.ADMINISTRATION)
  const setIntakeInterval = setFormProp<string>(MedicationProps.INTERVAL)
  const setStrength = (strengthProp: 'value' | 'unit') => {
    return (value: string) => {
      const newStrength: Partial<MedicationStrength> = {
        ...form.strength,
        [strengthProp]: value,
      }

      setForm({
        ...form,
        strength: newStrength,
      })
    }
  }

  const isBarcodeTestVisible =
    barcodeTestStatus === BarcodeUserTestStatus.SHOW_TEST ||
    barcodeTestStatus === BarcodeUserTestStatus.SHOW_MODAL_INFO

  const isBarcodeModalVisible = barcodeTestStatus === BarcodeUserTestStatus.SHOW_MODAL_INFO

  const handleBarcodeScanClick = () => {
    // TODO This is where we should register the user interaction
    // via GA or similar tools to see if there's interest for this
    // function before building it
    setBarcodeTestStatus(BarcodeUserTestStatus.SHOW_MODAL_INFO)
  }

  const handleBarcodeInfoModalClose = () => setBarcodeTestStatus(BarcodeUserTestStatus.HIDE_TEST)

  // Just for the sake of this demo, we reset the barcode status
  // after 6s so we can try the button again
  useEffect(() => {
    let timer: Timer
    if (barcodeTestStatus === BarcodeUserTestStatus.HIDE_TEST) {
      timer = setTimeout(() => setBarcodeTestStatus(BarcodeUserTestStatus.SHOW_TEST), 6 * 1000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [barcodeTestStatus])

  const handleSubmitForm = () => {
    let validationResult
    try {
      validationResult = validateAddMedicationForm(form as MedicationFormData)
    } catch (error: any) {
      setFormErrors(error.errors)
      return
    }
    // We pass `validationResult`, instead of `form`, since yup will type cast for us.
    dispatch(addMedication(validationResult as MedicationFormData))
    setIsFormSubmitted(true)
  }

  useEffect(() => {
    let timer: Timer
    if (formErrors.length > 0) {
      timer = setTimeout(() => setFormErrors([]), 5000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [formErrors])

  const handleCloseThankYouModal = () => {
    setIsFormSubmitted(false)
    navigation.goBack()
  }

  const handleSubmitAddFromPrevious = () => {
    if (addFromPreviousMedication) {
      // TODO We dont copy the administration/strength.unit props since
      // I haven't figured out how to make the select box controlled
      const {brandName, substance, strength, interval} = addFromPreviousMedication
      setForm({
        brandName,
        substance,
        strength: {
          value: strength.value,
        },
        interval,
      })
    }
    setIsAddFromPreviousModalVisible(false)
  }

  const unitData: SelectItem[] = Object.keys(UnitVariants).map(selectItemMapper)
  const administrationData: SelectItem[] = Object.keys(AdministrationVariants).map(selectItemMapper)

  return (
    <View style={styles.container}>
      <H2>Quick add</H2>
      {isBarcodeTestVisible ? (
        <SecondaryBlueButton
          style={{marginBottom: 8}}
          title="Scan medication barcode"
          onPress={handleBarcodeScanClick}
        />
      ) : null}

      <SecondaryBlueButton
        title="Add from existing"
        onPress={() => setIsAddFromPreviousModalVisible(true)}
      />
      <View style={styles.divider} />
      <H2>Medication data</H2>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.leftOfTwoColumns}>
          <Text>Brand name</Text>
          <TextInput value={form.brandName} onChangeText={setBrandName} />
        </View>
        <View style={styles.rightOfTwoColumns}>
          <Text>Substance</Text>
          <TextInput value={form.substance} onChangeText={setSubstance} />
        </View>
      </View>
      <Text>Strength</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.leftOfTwoColumns}>
          <TextInput
            keyboardType="numeric"
            value={String(form.strength?.value || '')}
            onChangeText={setStrength('value')}
          />
        </View>
        <View style={styles.rightOfTwoColumns}>
          <Select
            defaultButtonText="Select unit"
            data={unitData}
            onSelect={(selectedItem: SelectItem) => {
              setStrength('unit')(selectedItem.value)
            }}
            buttonTextAfterSelection={(selectedItem: SelectItem) => selectedItem.label}
            rowTextForSelection={(item: SelectItem) => item.label}
          />
        </View>
      </View>
      <Text>Hours between intake</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.leftOfTwoColumns}>
          <TextInput
            value={String(form.interval || '')}
            keyboardType="numeric"
            onChangeText={setIntakeInterval}
          />
        </View>
        <View style={styles.rightOfTwoColumns}>
          {/* TODO This select works exactly the same as the one above so it should be its own component */}
          <Select
            defaultButtonText="Select administration"
            data={administrationData}
            onSelect={(selectedItem: SelectItem) => setAdministration(selectedItem.value)}
            buttonTextAfterSelection={(selectedItem: SelectItem) => selectedItem.label}
            rowTextForSelection={(item: SelectItem) => item.label}
          />
        </View>
      </View>
      {/* These errors messages are not very user friendly/readable at the moment */}
      {formErrors.length > 0 ? (
        <Text style={{color: '#dd0000', marginBottom: 8}}>{formErrors.map(error => error)}</Text>
      ) : null}
      <PrimaryBlueButton title="Add" onPress={handleSubmitForm} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFormSubmitted}
        onRequestClose={handleCloseThankYouModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your medicine has been added. Have a nice day!</Text>
            <PrimaryBlueButton title="OK" onPress={handleCloseThankYouModal} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBarcodeModalVisible}
        onRequestClose={handleBarcodeInfoModalClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Thank you for showing interest in our barcode scanner! We have registered your
              interest and if enough people want it - we will make it happen.
            </Text>
            <PrimaryBlueButton title="OK" onPress={handleBarcodeInfoModalClose} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddFromPreviousModalVisible}
        onRequestClose={() => setIsAddFromPreviousModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {medications.length > 0 ? (
              <>
                <Select
                  defaultButtonText="Select medication"
                  data={medications}
                  onSelect={(selectedItem: IMedicationWithId) => {
                    setAddFromPreviousMedication(selectedItem)
                  }}
                  buttonTextAfterSelection={(selectedItem: IMedicationWithId) =>
                    selectedItem.brandName
                  }
                  rowTextForSelection={(item: IMedicationWithId) => item.brandName}
                />
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.leftOfTwoColumns}>
                    <SecondaryBlueButton
                      title="Cancel"
                      style={{width: '100%'}}
                      onPress={() => setIsAddFromPreviousModalVisible(false)}
                    />
                  </View>
                  <View style={styles.rightOfTwoColumns}>
                    <PrimaryBlueButton title="OK" onPress={handleSubmitAddFromPrevious} />
                  </View>
                </View>
              </>
            ) : (
              <View>
                <Text style={{marginBottom: 8}}>You have no medications.</Text>
                <SecondaryBlueButton
                  title="Cancel"
                  onPress={() => setIsAddFromPreviousModalVisible(false)}
                />
              </View>
            )}
            <Text style={styles.modalText}></Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}
