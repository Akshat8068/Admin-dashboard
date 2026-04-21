import type { FAQItem } from "@/types";

export const faqData: FAQItem[] = [
    {
        id: "faq-1",
        question: "How can I place an order?",
        answer:
            "You can place an order by browsing products, adding them to your cart, and completing checkout using your preferred payment method.",
        category: "orders",
    },
    {
        id: "faq-2",
        question: "Can I cancel or modify my order?",
        answer:
            "Yes, you can cancel or modify your order before it is shipped. Go to your orders section and select the order you want to update.",
        category: "orders",
    },
    {
        id: "faq-3",
        question: "What payment methods are accepted?",
        answer:
            "We accept credit/debit cards, UPI, net banking, and select digital wallets. All payments are securely processed.",
        category: "payment",
    },
    {
        id: "faq-4",
        question: "Is my payment information secure?",
        answer:
            "Yes, all transactions are encrypted and processed through secure payment gateways. We do not store your card details.",
        category: "payment",
    },
    {
        id: "faq-5",
        question: "How long does delivery take?",
        answer:
            "Delivery typically takes 3–7 business days depending on your location and product availability.",
        category: "shipping",
    },
    {
        id: "faq-6",
        question: "Can I track my shipment?",
        answer:
            "Yes, once your order is shipped, you will receive a tracking link via email or SMS.",
        category: "shipping",
    },
    {
        id: "faq-7",
        question: "What is your return policy?",
        answer:
            "You can request a return within 7 days of delivery if the product is unused and in original condition.",
        category: "returns",
    },
    {
        id: "faq-8",
        question: "How do I request a refund?",
        answer:
            "Refunds can be initiated from the orders page. Once approved, the amount will be credited within 5–7 business days.",
        category: "returns",
    },
    {
        id: "faq-9",
        question: "How do I create an account?",
        answer:
            "Click on the sign-up button, enter your details, and verify your email or mobile number to create an account.",
        category: "account",
    },
    {
        id: "faq-10",
        question: "I forgot my password. What should I do?",
        answer:
            "Click on 'Forgot Password' on the login page and follow the instructions to reset your password securely.",
        category: "account",
    },
    {
        id: "faq-11",
        question: "Do you offer customer support?",
        answer:
            "Yes, our support team is available via chat and email to assist you with any queries.",
        category: "general",
    },
    {
        id: "faq-12",
        question: "Are there any hidden charges?",
        answer:
            "No, all prices displayed include applicable charges. Any additional fees (like delivery) are shown clearly at checkout.",
        category: "general",
    },
];