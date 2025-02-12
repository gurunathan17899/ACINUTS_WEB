// TermsAndConditions.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet,TouchableOpacity, SafeAreaView } from 'react-native';
//import Icon from 'react-native-vector-icons/Feather';
import { colors, primaryFontfamily, secondaryFontfamily } from '../../../Configuration';

const TermsAndConditions = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <Text style={styles.heading}>Terms And Conditions</Text>
        </View>

        <Text style={styles.paragraph}>
          The terms "We" / "Us" / "Our"/”Company” individually and collectively
          refer to ACI TRADERS, and the terms "Visitor” ”User” refer to the
          users.
        </Text>

        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          This page states the Terms and Conditions under which you (Visitor)
          may visit this website (“Website”). Please read this page carefully.
          If you do not accept the Terms and Conditions stated here, we would
          request you to exit this site. The business, any of its business
          divisions, and/or its subsidiaries, associate companies, or
          subsidiaries to subsidiaries, or such other investment companies (in
          India or abroad) reserve their respective rights to revise these Terms
          and Conditions at any time by updating this posting. You should visit
          this page periodically to re-appraise yourself of the Terms and
          Conditions, because they are binding on all users of this Website.
        </Text>

        <Text style={styles.sectionTitle}>2. Use of Content</Text>
        <Text style={styles.paragraph}>
          All logos, brands, marks headings, labels, names, signatures,
          numerals, shapes, or any combinations thereof, appearing on this site,
          except as otherwise noted, are properties either owned or used under
          license by the business and/or its associate entities who feature on
          this Website. The use of these properties or any other content on this
          site, except as provided in these terms and conditions or in the site
          content, is strictly prohibited. You may not sell or modify the
          content of this Website or reproduce, display, publicly perform,
          distribute, or otherwise use the materials in any way for any public
          or commercial purpose without the respective organisation’s or
          entity’s written permission.
        </Text>

        <Text style={styles.sectionTitle}>3. Acceptable Website Use</Text>
        <Text style={styles.subSectionTitle}>(A) Security Rules</Text>
        <Text style={styles.paragraph}>
          Visitors are prohibited from violating or attempting to violate the
          security of the Website, including, without limitation, (1) accessing
          data not intended for such user or logging into a server or account
          which the user is not authorised to access, (2) attempting to probe,
          scan or test the vulnerability of a system or network or to breach
          security or authentication measures without proper authorisation, (3)
          attempting to interfere with service to any user, host or network,
          including, without limitation, via means of submitting a virus or
          "Trojan horse" to the Website, overloading, "flooding", "mail bombing"
          or "crashing", or (4) sending unsolicited electronic mail, including
          promotions and/or advertising of products or services. Violations of
          system or network security may result in civil or criminal liability.
          The business and/or its associate entities will have the right to
          investigate occurrences that they suspect as involving such violations
          and will have the right to involve, and cooperate with, law
          enforcement authorities in prosecuting users who are involved in such
          violations.
        </Text>

        <Text style={styles.subSectionTitle}>(B) General Rules</Text>
        <Text style={styles.paragraph}>
          Visitors may not use the Website in order to transmit, distribute,
          store, or destroy material (a) that could constitute or encourage
          conduct that would be considered a criminal offence or violate any
          applicable law or regulation, (b) in a manner that will infringe the
          copyright, trademark, trade secret, or other intellectual property
          rights of others or violate the privacy or publicity of other personal
          rights of others, or (c) that is libellous, defamatory, pornographic,
          profane, obscene, threatening, abusive or hateful.
        </Text>

        <Text style={styles.sectionTitle}>4. Indemnity</Text>
        <Text style={styles.paragraph}>
          The User unilaterally agrees to indemnify and hold harmless, without
          objection, the Company, its officers, directors, employees, and agents
          from and against any claims, actions, and/or demands, and/or
          liabilities, and/or losses, and/or damages whatsoever arising from or
          resulting from their use of WWW.ACINUTS.COM or their breach of the
          terms.
        </Text>

        <Text style={styles.sectionTitle}>5. Liability</Text>
        <Text style={styles.paragraph}>
          User agrees that neither Company nor its group companies, directors,
          officers, or employees shall be liable for any direct or/and indirect
          or/and incidental or/and special or/and consequential or/and exemplary
          damages, resulting from the use or/and the inability to use the
          service or/and for the cost of procurement of substitute goods or/and
          services or resulting from any goods or/and data or/and information
          or/and services purchased or/and obtained or/and messages received
          or/and transactions entered into through or/and from the service
          or/and resulting from unauthorized access to or/and alteration of
          user's transmissions or/and data or/and arising from any other matter
          relating to the service, including but not limited to, damages for
          loss of profits or/and use or/and data or other intangible, even if
          Company has been advised of the possibility of such damages. User
          further agrees that Company shall not be liable for any damages
          arising from interruption, suspension or termination of service,
          including but not limited to direct or/and indirect or/and incidental
          or/and special consequential or/and exemplary damages, whether such
          interruption or/and suspension or/and termination was justified or
          not, negligent or intentional, inadvertent or advertent.
        </Text>

        <Text style={styles.sectionTitle}>
          6. Disclaimer of Consequential Damages
        </Text>
        <Text style={styles.paragraph}>
          In no event shall Company or any parties, organizations, or entities
          associated with the corporate brand name us or otherwise, mentioned at
          this Website be liable for any damages whatsoever (including, without
          limitations, incidental and consequential damages, lost profits, or
          damage to computer hardware or loss of data information or business
          interruption) resulting from the use or inability to use the Website
          and the Website material, whether based on warranty, contract, tort,
          or any other legal theory, and whether or not, such organization or
          entities were advised of the possibility of such damages.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:colors.primaryColor
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color:colors.primaryColor
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color:colors.primaryColor
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 14,
    textAlign: 'justify',
    color:'black',
    fontFamily:secondaryFontfamily
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: primaryFontfamily,
    color: colors.primaryColor,
  },
});

export default TermsAndConditions;
