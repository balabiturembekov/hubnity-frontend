export const corePlans = [
  {
    id: "Starter",
    name: "Starter",
    price: {
      monthly: 5.99,
      quarterly: 17.99,
      yearly: 59.99,
    },
    features: [
      "Up to 3 team members",
      "Basic time tracking",
      "Standard support",
    ],
    isPopular: false,
  },
  {
    id: "Pro",
    name: "Pro",
    price: {
      monthly: 7.99,
      quarterly: 23.99,
      yearly: 79.99,
    },
    features: [
      "Up to 15 team members",
      "Advanced time tracking",
      "Detailed reporting",
      "Priority support",
      "Custom invoicing",
    ],
    isPopular: true,
  },
  {
    id: "Enterprise",
    name: "Enterprise",
    price: {
      monthly: 19.99,
      quarterly: 59.99,
      yearly: 199.99,
    },
    features: [
      "Unlimited team members",
      "Advanced time tracking",
      "Custom reporting & analytics",
      "24/7 dedicated support",
      "Custom invoicing",
      "SSO & Advanced Security",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
    ],
    isPopular: false,
  },
];
