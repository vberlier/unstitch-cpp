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
    KeyboardEventSubscriber keyboardEventSubscriber_0Internal{
        'W',
        [this]{
            //// Pressed
            MergeExecution_0();
        },
        [this]{
            //// Released
            MergeExecution_1();
        },
    };

    //// 1 11 Keyboard "S"
    KeyboardEventSubscriber keyboardEventSubscriber_1Internal{
        'S',
        [this]{
            //// Pressed
            MergeExecution_1();
        },
        [this]{
            //// Released
            MergeExecution_0();
        },
    };

    //// 3 19 Keyboard "F"
    KeyboardEventSubscriber keyboardEventSubscriber_2Internal{
        'F',
        [this]{
            //// Pressed
            Reset_0();
        },
        [this]{
            //// Released
        },
    };

    //// 4 9 Do N
    int m_Counter_0Internal = 0;

    void Enter_0()
    {
        int n_0Input = 20;
        if (m_Counter_0Internal < n_0Input)
        {
            int counter_0 = ++m_Counter_0Internal;

            //// Exit

            //// 4 1
            VehicleMovement& vehicleMovement_0Pure = m_VehicleMovement;

            //// 4 4
            float throttle_0Pure = m_Throttle;

            //// 5 8 Set Throttle Input
            VehicleMovement& vehicleMovement_0Input = vehicleMovement_0Pure;
            float throttle_0Input = throttle_0Pure;
            vehicleMovement_0Input.SetThrottleInput(throttle_0Input);

            ////
        }
    }

    void Reset_0()
    {
        m_Counter_0Internal = 0;
    }

    ////
    void MergeExecution_0()
    {
        //// 1 1
        float throttle_0Pure = m_Throttle;

        //// 2 1
        float a_0Input = throttle_0Pure;
        float b_0Input = 1;
        float sum_0Pure = a_0Input + b_0Input;

        //// 3 6 Set Throttle
        float throttle_0Input = sum_0Pure;
        m_Throttle = throttle_0Input;

        ////
        Enter_0();
    }

    ////
    void MergeExecution_1()
    {
        //// 1 17
        float throttle_0Pure = m_Throttle;

        //// 2 17
        float a_0Input = throttle_0Pure;
        float b_0Input = -1;
        float sum_0Pure = a_0Input + b_0Input;

        //// 3 11 Set Throttle
        float throttle_0Input = sum_0Pure;
        m_Throttle = throttle_0Input;

        ////
        Enter_0();
    }
};
