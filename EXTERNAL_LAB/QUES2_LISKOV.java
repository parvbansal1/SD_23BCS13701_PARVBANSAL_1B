
public class LiskovSubs {
    public interface social_media {

    }

    public interface message_reels extends social_media {
        void send_message();

        void send_reels();
    }

    public interface message_paymetns_video extends message_reels {
        void send_payment();

        void send_video();
    }

    public class instagram implements message_reels {

        @Override
        public void send_message() {
            System.out.println("Message sent");
        }

        @Override
        public void send_reels() {
            System.out.println("Reels sent");
        }

    }

    public class WhatsApp extends instagram implements message_paymetns_video {

        @Override
        public void send_payment() {
            System.out.println("Payment sent");
        }

        @Override
        public void send_video() {
            System.out.println("Video sent");
        }

    }

    public class Facebook implements message_reels {
        public void send_message() {
            System.out.println("Message sent");
        }

        public void send_reels() {
            System.out.println("Reels sent");
        }
    }

    public static void main(String[] args) {
        LiskovSubs obj = new LiskovSubs();
        instagram insta = obj.new instagram();
        WhatsApp wa = obj.new WhatsApp();
        Facebook fb = obj.new Facebook();

        insta.send_message();
        insta.send_reels();

        wa.send_message();
        wa.send_reels();
        
        fb.send_message();
        fb.send_reels();
    }
}
