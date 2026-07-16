import AddTransactionButton from "@/components/home/addTransactionButton";
import Balance from "@/components/home/balance";
import Header from "@/components/home/header";
import Summary from "@/components/home/summary";
import Transactions from "@/components/home/transactions";
import { ScrollView } from "react-native";
import { ScreenContainer } from "react-native-screens";

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <ScrollView>
        <Header />
        <Balance />
        <Summary />
        <Transactions />
      </ScrollView>
      <AddTransactionButton />
    </ScreenContainer>
  );
}
