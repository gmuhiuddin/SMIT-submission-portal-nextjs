'use client';

import React, { useState, ReactNode, FC, memo } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Badge } from '@mui/material';

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel: FC<TabPanelProps> = memo(({ children, value, index, ...other }) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
));

CustomTabPanel.displayName = 'CustomTabPanel';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface TabItem {
    label: string;
    content: string | ReactNode;
    badgeContent?: number | string;
    textColor?: string;
}

interface TabsComponentProps {
    tabs: TabItem[];
}

const TabsComponent: FC<TabsComponentProps> = ({ tabs }) => {
    const [value, setValue] = useState(0);
    const [currentIndexColor, setCurrentIndexColor] = useState('');

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={(_, newValue) => setValue(newValue)}
                    sx={{
                        '& .MuiTab-root': { fontWeight: '900', fontFamily: 'sans-serif', fontSize: '12px' },
                        '& .Mui-selected': { backgroundColor: 'action.selected' },
                        '& .MuiTabs-indicator': { background: currentIndexColor }
                    }}
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            sx={{
                                '& .MuiBadge-badge': { position: 'relative', top: 8, p: 0 },
                                color: tab.textColor,
                                '&.Mui-selected': { color: `${tab.textColor} !important` },
                            }}
                            label={<Badge badgeContent={tab.badgeContent}>{tab.label}</Badge>}
                            {...a11yProps(index)}
                            onClick={() => tab.textColor && setCurrentIndexColor(tab.textColor)}
                        />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((tab, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    {tab.content}
                </CustomTabPanel>
            ))}
        </Box>
    );
}

export default TabsComponent;