import { Pencil } from 'lucide-react';

const Educations = () => {
    return (
        <section className="bg-white dark:bg-gray-800 rounded-lg dark:text-gray-200">
            <div className="p-4 space-y-4 w-full">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-semibold tracking-tight">Educations</h1>
                        <div className="bg-gray-100 hover:bg-gray-200 duration-300 h-8 w-8 flex items-center justify-center rounded-md cursor-pointer">
                            <span className="">
                            <Pencil size={15} />
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        The Eductions section is your opportunity to share your educations.
                    </p>
                </div>

                {/* Resume Content */}
                <div className='mt-6'>
                    <h1>Educations content</h1>
                </div>
            </div>
        </section>
    );
};

export default Educations;