// https://dev.epicgames.com/documentation/en-us/unreal-engine/flow-control-in-unreal-engine

struct KeyboardEventSubscriber
{
    template<typename... Args>
    KeyboardEventSubscriber(Args&&...);
};

struct VehicleMovement
{
    void SetThrottleInput(float throttle);
};

struct Example
{
    float m_Throttle;
    VehicleMovement m_VehicleMovement;

    //// 1 6 Keyboard "W"
    KeyboardEventSubscriber keyboardEventSubscriber_0{
        'W',
        [this]{
            //// Pressed
            Hoisted_0Link();
        },
        [this]{
            //// Released
            Hoisted_1Link();
        },
    };

    //// 1 11 Keyboard "S"
    KeyboardEventSubscriber keyboardEventSubscriber_1{
        'S',
        [this]{
            //// Pressed
            Hoisted_1Link();
        },
        [this]{
            //// Released
            Hoisted_0Link();
        },
    };

    //// 3 19 Keyboard "F"
    KeyboardEventSubscriber keyboardEventSubscriber_2{
        'F',
        [this]{
            //// Pressed
            Reset_0Link();
        },
        [this]{
            //// Released
        },
    };

    //// 4 9 Do N
    int m_Counter = 0;

    void Enter_0Link()
    {
        int n_0LinkDefault = 20;
        int n = n_0LinkDefault;
        if (m_Counter < n)
        {
            int counter_0Link = ++m_Counter;

            //// Exit

            //// 4 1
            VehicleMovement& vehicleMovement_0LinkPure = m_VehicleMovement;

            //// 4 4
            float throttle_0LinkPure = m_Throttle;

            //// 5 8 Set Throttle Input
            VehicleMovement& vehicleMovement = vehicleMovement_0LinkPure;
            float throttle = throttle_0LinkPure;
            vehicleMovement.SetThrottleInput(throttle);

            ////
        }
    }

    void Reset_0Link()
    {
        m_Counter = 0;
    }

    ////
    void Hoisted_0Link()
    {
        //// 2 1
        float a = Hoisted_2LinkPure();
        float b_0LinkDefault = 1;
        float b = b_0LinkDefault;
        float sum_0LinkPure = a + b;

        //// 3 6 Set Throttle
        float throttle = sum_0LinkPure;
        m_Throttle = throttle;

        ////
        Enter_0Link();
    }

    ////
    void Hoisted_1Link()
    {
        //// 2 17
        float a = Hoisted_2LinkPure();
        float b_0LinkDefault = -1;
        float b = b_0LinkDefault;
        float sum_0LinkPure = a + b;

        //// 3 11 Set Throttle
        float throttle = sum_0LinkPure;
        m_Throttle = throttle;

        ////
        Enter_0Link();
    }

    ////
    float Hoisted_2LinkPure()
    {
        //// 1 1
        float throttle_0LinkPure = m_Throttle;

        ////
        return throttle_0LinkPure;
    }
};
