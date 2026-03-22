import EventPhotoPage from '@/components/event-photo-page';

export default function Goosies2025() {
    return (
        <EventPhotoPage
            eventKey="goosies-2025"
            photoDir="/img/goosies/2025photos/"
            headerImageIdx={0}
            keepHeaderImageInBody={true}
        />
    );
}
