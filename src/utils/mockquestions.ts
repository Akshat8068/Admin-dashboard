export type HelpCategory = 'Orders' | 'Products' | 'Dashboard' | 'Account';

export interface FAQQuestion {
    id: string;
    question: string;
    answer: string;
    category: HelpCategory;
}

export const helpCategories: HelpCategory[] = ['Orders', 'Products', 'Dashboard', 'Account'];

export const mockQuestions: FAQQuestion[] = [
    {
        id: 'q-1',
        question: 'How do I view and manage customer orders?',
        answer: 'Go to the Orders section from the sidebar. You can filter orders by status, search by order ID or customer name, and update order status from the actions menu.',
        category: 'Orders',
    },
    {
        id: 'q-2',
        question: 'How do I process a refund for an order?',
        answer: 'Open the specific order, click on "Actions" and select "Initiate Refund". Enter the refund amount and reason. Refunds are processed within 5–7 business days.',
        category: 'Orders',
    },
    {
        id: 'q-3',
        question: 'Can I export order data to a CSV file?',
        answer: 'Yes. In the Orders table, click the "Export" button at the top right. You can choose to export all orders or apply filters before exporting.',
        category: 'Orders',
    },
    {
        id: 'q-4',
        question: 'How do I add a new product?',
        answer: 'Navigate to Products → Add Product from the sidebar. Fill in the product name, description, price, category, and upload images. Click "Save" to publish.',
        category: 'Products',
    },
    {
        id: 'q-5',
        question: 'How do I update stock/inventory for a product?',
        answer: 'Open the product from the Products list and scroll to the Inventory section. Update the stock quantity and click Save.',
        category: 'Products',
    },
    {
        id: 'q-6',
        question: 'How do I bulk delete or update products?',
        answer: 'In the Products table, check the checkboxes next to the products you want to manage. A bulk action toolbar will appear at the top.',
        category: 'Products',
    },
    {
        id: 'q-7',
        question: 'What does the Revenue Analytics chart show?',
        answer: 'The Revenue Analytics chart displays daily revenue vs order volume for the selected time range. You can switch between Last 8 Days, Last 30 Days, Last 3 Months, and Last Year.',
        category: 'Dashboard',
    },
    {
        id: 'q-8',
        question: 'How is the Monthly Target percentage calculated?',
        answer: 'The monthly target is set by the admin and compared against actual revenue for the current month. The circular progress indicator shows how close you are to hitting the target.',
        category: 'Dashboard',
    },
    {
        id: 'q-9',
        question: 'How do I change my admin password?',
        answer: 'Go to Settings → Account Security. Enter your current password, then your new password twice to confirm. Password must be at least 8 characters.',
        category: 'Account',
    },
    {
        id: 'q-10',
        question: 'How do I add another admin user?',
        answer: 'Navigate to Settings → Admin Users and click "Invite Admin". Enter their email address and assign a role. They will receive an invitation email.',
        category: 'Account',
    },
];
