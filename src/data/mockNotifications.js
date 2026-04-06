import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Transaction Successful",
    message: "You've saved more than 50% of your income this month.",
    type: "success",
    icon: CheckCircle,
    iconColor: "text-emerald-500 bg-emerald-500/10"
  },
  {
    id: 2,
    title: "Low Balance",
    message: "You are spending too much on rent.",
    type: "warning",
    icon: AlertCircle,
    iconColor: "text-rose-500 bg-rose-500/10"
  },
  {
    id: 3,
    title: "New Update Available",
    message: "A new version of the app is available.",
    type: "info",
    icon: Info,
    iconColor: "text-brand-secondary bg-brand-secondary/10"
  }
];