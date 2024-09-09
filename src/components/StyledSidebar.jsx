import { Link } from 'react-router-dom';
import { styled, Drawer, Accordion, AccordionSummary, AccordionDetails, List, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

export const SidebarDrawer = styled(Drawer)(() => ({
    '& .MuiDrawer-paper': { 
        backgroundColor: '#dff1fb',
        boxShadow: '5px 0 5px rgba(0, 0, 0, 0.1)',
        transistion: 'left 0.3s ease',
        boxSizing: 'border-box' 
    },
    '& img': { height: '80px' },
    '& .MuiAccordionSummary-content': { margin: 'auto' },
    '& .MuiListItemText-primary': { color: '#7ab7d2', textAlign: 'left' },
    '& .MuiAccordionDetails-root': { bgcolor: '#dff1fb', color: '#7ab7d2' },
}));

export function SidebarAccordion({ content, accordionState, onChange }) {
    const ArrangeDetails = ({details, links}) => {
        let detailItems = [];
        for(let i in details) {
            detailItems.push(
                <ListItemButton components={Link} to={links[i]}>
                        <ListItemText inset primary={details[i]} primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                </ListItemButton>
            )
        }
        return detailItems;
    };
    return (
        content.map(item => (
            item.details? 
                // 有子選項
                (<Accordion classes={item.className} 
                    disableGutters 
                    expanded={accordionState[item.className]}    // expand accordingly
                    onChange={onChange(item.className)}   // send new state using onChange()
                    sx={{bgcolor: '#dff1fb', margin: '0px'}} >
                    <AccordionSummary expandIcon={<ExpandMore />} >
                        <ListItemButton disableRipple >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.summary} primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                        </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>       
                        <List>
                            <ArrangeDetails details={item.details} links={item.links} />
                        </List>
                    </AccordionDetails>
                </Accordion>):
                // 無子選項
                (<Accordion classes={item.className} disableGutters sx={{bgcolor: '#dff1fb'}}>
                    <AccordionSummary>
                        <ListItemButton components={Link} to={item.links} disableRipple >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.summary} primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                        </ListItemButton>
                    </AccordionSummary>
                </Accordion>)
        ))
    );
}