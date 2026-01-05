import EventPhotoPage from '@/components/event-photo-page';

export default function Goosies2024() {
    return (
        <EventPhotoPage
            eventKey="goosies-2024"
            photoDir="/img/goosies/2024photos/"
            headerImageIdx={0}
            keepHeaderImageInBody={true}
        />
    );
}
