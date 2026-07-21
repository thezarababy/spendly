import Header from "@/components/addTransaction/header";
import TransactionToggle from "@/components/addTransaction/transactionToggle";
import { ScrollView } from "react-native";
import { ScreenContainer } from "react-native-screens";

export default function AddTransaction() {
  return (
    <ScreenContainer>
      <ScrollView>
        <Header />

        <TransactionToggle />

        {/* Form */}

        {/* Title */}

        {/* Amount */}

        {/* Category */}

        {/* Date */}

        {/* Notes */}

        {/* Save Button */}
      </ScrollView>
    </ScreenContainer>
  );
}
