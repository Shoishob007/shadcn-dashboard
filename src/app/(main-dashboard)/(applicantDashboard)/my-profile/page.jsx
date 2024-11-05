import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import profileImg from '.././../../../../public/assests/profile-pic.jpg';

const ProfilePage = () => {
    return (
        <div>
            {/* Profile Header */}
            <section>
                <div className='profile-banner'>
                    {/* button container */}
                    <div className='flex flex-wrap items-center justify-center md:items-end md:justify-end gap-5 h-full md:pr-5 pb-8'>
                        <div className='bg-[#efefef38] px-[18px] cursor-pointer py-2.5 rounded-lg text-white text-sm font-medium'>
                            <span>123</span>
                            <span className='ml-1'>Following</span>
                        </div>
                        <div className='bg-[#efefef38] px-[18px] py-2.5 cursor-pointer rounded-lg text-white text-sm font-medium'>
                            <span>456</span>
                            <span className='ml-1'>Followers</span>
                        </div>
                        <div className='px-[18px] py-2.5 bg-primary text-primary-foreground shadow hover:bg-primary/90 cursor-pointer rounded-lg text-sm font-medium'>
                            <span >Update Profile</span>
                        </div>
                    </div>
                </div>

                {/* image container */}

                <div className='flex items-center gap-4 -mt-[180px] md:-mt-[126px] pl-4 md:pl-[42px]'>
                    {/* image */}
                    <div>
                        <Image
                            src={profileImg}
                            alt='photo'
                            width={163}
                            height={163}
                            className='rounded-2xl border-4 border-white object-cover'
                        />
                    </div>
                    {/* text */}
                    <div>
                        <h1 className='font-semibold text-2xl text-white'>Franklin Jr</h1>
                        <p className='text-[10px] text-white'>UI / UX Designer</p>
                        {/* location */}
                        <div className='flex items-center text-xs text-white'>
                            <span><MapPin width={12} /></span>
                            <span className='text-[10px]'>Medan, Sumatera Utara - ID</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;