import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/UI/Accordion';
import { Input } from '@/components/UI/input';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/UI/dropdown-menu';
import { FormBuilder, type FieldConfig } from '@/components/common/FormBuilder';
import { mockQuestions, helpCategories, type HelpCategory } from '@/utils/mockquestions';
import { z } from 'zod';

const faqSections = [
    { id: 'Orders', category: 'Orders & Payments' },
    { id: 'Products', category: 'Products & Inventory' },
    { id: 'Dashboard', category: 'Dashboard & Analytics' },
    { id: 'Account', category: 'Account & Settings' },
] as const;

const supportSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Enter a valid email'),
    contactNumber: z.string().min(1, 'Contact number is required'),
    problemDescription: z.string().min(1, 'Please describe your problem'),
});

type SupportForm = z.infer<typeof supportSchema>;

const supportFields: FieldConfig<SupportForm>[] = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', required: true },
    { name: 'contactNumber', label: 'Contact Number', type: 'number', placeholder: 'Phone number', required: true },
    {
        name: 'problemDescription',
        label: 'Problem Description',
        type: 'custom',
        required: true,
        render: (field) => (
            <textarea
                {...field}
                rows={4}
                placeholder="Describe your issue..."
                className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6900] resize-none"
            />
        ),
    },
];

const AdminHelp = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<HelpCategory | 'All'>('All');

    const filtered = mockQuestions.filter((q) => {
        const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase()) ||
            q.answer.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'All' || q.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const getSectionQuestions = (sectionId: string) =>
        filtered.filter((q) => q.category === sectionId);

    const visibleSections = faqSections.filter((s) =>
        activeCategory === 'All' ? getSectionQuestions(s.id).length > 0 : s.id === activeCategory
    );

    const handleSupportSubmit = async (data: SupportForm) => {
        console.log('Support form submitted:', data);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-hover">
                    <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">Help & FAQ</h1>
                    <p className="text-xs text-gray-400">Find answers to common admin questions</p>
                </div>
            </div>

            {/* Search + Filter */}
            <div className="flex items-center gap-3">
                <Input
                    placeholder="Search help articles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 px-4 h-10 rounded-md border border-gray-300 bg-white text-sm text-gray-700 hover:bg-hover transition-colors">
                        {activeCategory === 'All' ? 'All Categories' : activeCategory}
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[160px]">
                        <DropdownMenuItem
                            onClick={() => setActiveCategory('All')}
                            className={activeCategory === 'All' ? 'text-primary font-medium' : ''}
                        >
                            All Categories
                        </DropdownMenuItem>
                        {helpCategories.map((cat) => (
                            <DropdownMenuItem
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={activeCategory === cat ? 'text-primary font-medium' : ''}
                            >
                                {cat}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* FAQ Sections */}
            {visibleSections.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No results found for "{search}"</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {visibleSections.map((section) => {
                        const questions = getSectionQuestions(section.id);
                        if (questions.length === 0) return null;
                        return (
                            <Card key={section.id} className="bg-white border border-gray-100">
                                <CardHeader className="pb-0 px-5 pt-5">
                                    <CardTitle className="text-sm font-semibold text-gray-800">
                                        {section.category}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-5 pb-4 pt-2">
                                    <Accordion type="single" collapsible>
                                        {questions.map((q) => (
                                            <AccordionItem key={q.id} value={q.id}>
                                                <AccordionTrigger>{q.question}</AccordionTrigger>
                                                <AccordionContent>{q.answer}</AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Contact Support */}
            <Card className="bg-white mx-6 border border-gray-100">
                <CardHeader className="px-6 pt-6 pb-2">
                    <CardTitle className="text-base font-semibold text-gray-800">Still need help?</CardTitle>
                    <p className="text-xs text-gray-400 mt-1">Fill out the form below and we'll get back to you shortly.</p>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <FormBuilder<SupportForm>
                        fields={supportFields}
                        validation={supportSchema}
                        onSubmit={handleSupportSubmit}
                        submitText="Contact Us"
                        submitClassName="bg-primary hover:bg-secondary"
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminHelp;
