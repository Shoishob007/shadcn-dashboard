import PageTitle from "@/components/PageTitle";
import JobListings from "./components/JobListings";

const jobs = () => {
    return (
        <div>
            <PageTitle title={'Search for Job'} />
            
            {/* Jobs card */}
            <section className="mt-4">
                <JobListings/>
            </section>
        </div>
    );
};

export default jobs;