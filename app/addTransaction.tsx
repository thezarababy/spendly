import Header from "@/components/addTransaction/header";
import TransactionForm from "@/components/addTransaction/transactionForm";
import TransactionToggle from "@/components/addTransaction/transactionToggle";
import { useState } from "react";
import { ScrollView } from "react-native";
import { ScreenContainer } from "react-native-screens";

interface TransactionFormData {
  transactionType: "expense" | "income";
  title: string;
  amount: string;
  category: string;
  date: Date;
  notes: string;
}

export default function AddTransaction() {
  const [formData, setFormData] = useState<TransactionFormData>({
    transactionType: "expense",
    title: "",
    amount: "",
    category: "",
    date: new Date(),
    notes: "",
  });

  return (
    <ScreenContainer>
      <ScrollView>
        <Header />

        {/* cast props to any to satisfy JSX typing */}
        <TransactionToggle
          {...({
            value: formData.transactionType,
            onChange: (type: any) =>
              setFormData({
                ...formData,
                transactionType: type,
              }),
          } as any)}
        />

        <TransactionForm formData={formData} setFormData={setFormData} />

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
