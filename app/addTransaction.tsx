import TransactionForm from "@/components/addTransaction/transactionForm";
import { ScrollView } from "react-native";
import { ScreenContainer } from "react-native-screens";

export default function AddTransaction() {
  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <TransactionForm />
      </ScrollView>
    </ScreenContainer>
  );
}
