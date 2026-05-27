import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';
import {SafeAreaView} from 'react-native-safe-area-context';

const PasswordSchema = Yup.object().shape({
  passwordLenght: Yup.number()
    .min(4, 'Should be minimum 4 characters')
    .max(16, 'Should be maximum 16 characters')
    .required('Length is required')
});

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [isPassGenerator, setIsPassGenerator] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  // Theme
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const generatorPasswordString = (passwordLenght: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*`~;:"_-?/|\\><';

    if (upperCase) {
      characterList += upperCaseChars;
    }

    if (lowerCase) {
      characterList += lowerCaseChars;
    }

    if (number) {
      characterList += digits;
    }

    if (symbols) {
      characterList += specialChars;
    }

    // Prevent empty selection
    if (characterList.length === 0) {
      return;
    }

    const passwordResult = createPassword(
      characterList,
      passwordLenght,
    );

    setPassword(passwordResult);
    setIsPassGenerator(true);
  };

  const createPassword = (
    characters: string,
    passwordLenght: number,
  ) => {
    let result = '';

    for (let i = 0; i < passwordLenght; i++) {

      // FIXED
      // Math.floor is safer than Math.round
      const characterIndex = Math.floor(
        Math.random() * characters.length,
      );

      result += characters.charAt(characterIndex);
    }

    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPassGenerator(false);

    setLowerCase(true);
    setUpperCase(false);
    setNumber(false);
    setSymbols(false);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[
        styles.scrollContainer,
        {
          backgroundColor: isDarkMode ? '#121212' : '#F5F7FA',
        },
      ]}>
    <StatusBar backgroundColor={'#29AB87'}/>
      <SafeAreaView style={styles.appContainer}>
        <View
          style={[
            styles.formContainer,
            {
              backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
            },
          ]}>

          <Text
            style={[
              styles.title,
              {
                color: isDarkMode ? '#FFFFFF' : '#000000',
              },
            ]}>
            Password Generator
          </Text>

          <Formik
            initialValues={{passwordLenght: ''}}
            validationSchema={PasswordSchema}
            validateOnMount={true}
            onSubmit={values => {
              generatorPasswordString(+values.passwordLenght);
            }}>

            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>

                {/* Password Length Input */}
                <View style={styles.inputWrapper}>
                  <View style={styles.inputCol}>
                    <Text
                      style={[
                        styles.heading,
                        {
                          color: isDarkMode
                            ? '#FFFFFF'
                            : '#000000',
                        },
                      ]}>
                      Password Length
                    </Text>

                    {/* FIXED */}
                    {/* Showing actual error message */}
                    {touched.passwordLenght &&
                      errors.passwordLenght && (
                        <Text style={styles.errorText}>
                          {errors.passwordLenght}
                        </Text>
                      )}
                  </View>

                  <TextInput
                    style={[
                      styles.inputStyle,
                      {
                        backgroundColor: isDarkMode
                          ? '#2C2C2C'
                          : '#F1F3F6',

                        color: isDarkMode
                          ? '#FFFFFF'
                          : '#000000',
                      },
                    ]}
                    value={values.passwordLenght}
                    onChangeText={handleChange('passwordLenght')}
                    placeholder="Ex. 8"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                </View>

                {/* Lowercase */}
                <View style={styles.inputWrapper}>
                  <Text
                    style={[
                      styles.heading,
                      {
                        color: isDarkMode
                          ? '#FFFFFF'
                          : '#000000',
                      },
                    ]}>
                    Include Lowercase
                  </Text>

                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={lowerCase}
                    onPress={() =>
                      setLowerCase(!lowerCase)
                    }
                    fillColor="#29AB87"
                  />
                </View>

                {/* Uppercase */}
                <View style={styles.inputWrapper}>
                  <Text
                    style={[
                      styles.heading,
                      {
                        color: isDarkMode
                          ? '#FFFFFF'
                          : '#000000',
                      },
                    ]}>
                    Include Uppercase
                  </Text>

                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={upperCase}
                    onPress={() =>
                      setUpperCase(!upperCase)
                    }
                    fillColor="#29AB87"
                  />
                </View>

                {/* Numbers */}
                <View style={styles.inputWrapper}>
                  <Text
                    style={[
                      styles.heading,
                      {
                        color: isDarkMode
                          ? '#FFFFFF'
                          : '#000000',
                      },
                    ]}>
                    Include Numbers
                  </Text>

                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={number}
                    onPress={() =>
                      setNumber(!number)
                    }
                    fillColor="#29AB87"
                  />
                </View>

                {/* Symbols */}
                <View style={styles.inputWrapper}>
                  <Text
                    style={[
                      styles.heading,
                      {
                        color: isDarkMode
                          ? '#FFFFFF'
                          : '#000000',
                      },
                    ]}>
                    Include Symbols
                  </Text>

                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={symbols}
                    onPress={() =>
                      setSymbols(!symbols)
                    }
                    fillColor="#29AB87"
                  />
                </View>

                {/* Buttons */}
                <View style={styles.formAction}>

                  {/* FIXED */}
                  {/* Added handleSubmit */}
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}>

                    <Text style={styles.primaryBtnText}>
                      Generate Password
                    </Text>
                  </TouchableOpacity>

                  {/* FIXED */}
                  {/* Added reset functionality */}
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>

                    <Text style={styles.secondaryBtnText}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Generated Password Output */}
                {isPassGenerator && (
                  <View style={styles.resultContainer}>
                    <Text style={styles.resultLabel}>
                      Generated Password.
                    <Text style={{fontSize: 12, color: '#ffffff65'}}>
                       You Can Copy
                    </Text> </Text>

                    <Text selectable={true} style={styles.resultText}>
                      {password}
                    </Text>
                  </View>
                )}
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PasswordGenerator;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },

  appContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  formContainer: {
    borderRadius: 20,
    padding: 20,

    // ADDED
    // Nice card shadow
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 25,
  },

  inputWrapper: {
    marginBottom: 20,

    // ADDED
    // Better alignment
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  inputCol: {
    flex: 1,
    marginRight: 15,
  },

  inputStyle: {
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    width: 100,
  },

  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4
  },

  errorText: {
    color: '#FF4D4D',
    marginTop: 5,
    fontSize: 12,
  },

  formAction: {
    marginTop: 10,
    gap: 15,
  },

  // ADDED
  // Primary button style
  primaryBtn: {
    backgroundColor: '#29AB87',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // ADDED
  // Secondary button style
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#29AB87',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  secondaryBtnText: {
    color: '#29AB87',
    fontSize: 16,
    fontWeight: '700',
  },

  // ADDED
  // Password result card
  resultContainer: {
    marginTop: 30,
    backgroundColor: '#29AB87',
    borderRadius: 16,
    padding: 18,
  },

  resultLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
  },

  resultText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
});